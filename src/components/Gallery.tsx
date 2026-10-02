"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface GalleryPhoto {
  id: string;
  img_url: string;
  caption: string | null;
  created_at: string;
}

export default function Gallery() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  useEffect(() => {
    let ignore = false;

    const loadGallery = async () => {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });

      if (ignore) return;

      if (error) {
        console.error("Gallery loading error:", error);
        setPhotos([]);
        setLoading(false);
        return;
      }

      setPhotos((data ?? []) as GalleryPhoto[]);
      setLoading(false);
    };

    void loadGallery();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (!selectedPhoto) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedPhoto(null);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [selectedPhoto]);

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-600">Loading photos...</div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="rounded-2xl bg-[#f8f8f8] px-6 py-16 text-center text-gray-600">
        No photos uploaded yet.
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
        {photos.map((photo) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setSelectedPhoto(photo)}
            className="group relative block h-[300px] overflow-hidden rounded-[18px] text-left shadow-[0_15px_35px_rgba(0,0,0,0.12)] transition duration-300 hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-[#17593f] focus:ring-offset-2"
          >
            <img
              src={photo.img_url}
              alt={photo.caption || "Church Photo"}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-[18px] pb-[18px] pt-14 text-left text-white">
              <p className="text-base">{photo.caption || ""}</p>
            </div>
          </button>
        ))}
      </div>

      {selectedPhoto && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-5 sm:p-10"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedPhoto(null);
            }
          }}
        >
          <button
            type="button"
            onClick={() => setSelectedPhoto(null)}
            aria-label="Close image"
            className="absolute right-5 top-5 z-[10000] bg-transparent text-5xl leading-none text-white transition hover:opacity-70"
          >
            &times;
          </button>

          <div className="flex max-h-[90vh] max-w-[95vw] flex-col items-center">
            <img
              src={selectedPhoto.img_url}
              alt={selectedPhoto.caption || "Church Photo"}
              className="max-h-[82vh] max-w-[95vw] rounded-[10px] object-contain shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            />

            {selectedPhoto.caption && (
              <p className="mt-5 max-w-[80vw] text-center text-lg text-white">
                {selectedPhoto.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
