"use client";

import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import EventCalendar from "@/components/EventCalendar";
import { supabase } from "@/lib/supabase";

const ADMIN_PASSWORD = "Disapp1844!";

type EventType = "meeting" | "worship" | "prayer" | "fellowship" | "outreach";

interface ChurchEvent {
  id: string;
  title: string;
  date: string | null;
  time: string | null;
  location: string | null;
  type: EventType | string;
  repeat: string | null;
  dayOfWeek: number | null;
}

interface GalleryPhoto {
  id: string;
  img_url: string;
  caption: string | null;
  created_at: string;
}

const eventTypes: EventType[] = [
  "meeting",
  "worship",
  "prayer",
  "fellowship",
  "outreach",
];

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    setMounted(true);
    setIsAdmin(localStorage.getItem("isAdmin") === "true");
  }, []);

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("isAdmin", "true");
      setIsAdmin(true);
      setLoginError("");
      setPassword("");
    } else {
      setLoginError("Wrong password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
  };

  if (!mounted) {
    return null;
  }

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-[#f5f5f5] px-4 pb-20 pt-[120px]">
        <div className="mx-auto w-full max-w-[420px]">
          <form
            onSubmit={handleLogin}
            className="rounded-2xl bg-white p-8 shadow-[0_15px_40px_rgba(0,0,0,0.08)]"
          >
            <h1 className="mb-6 text-3xl font-bold">Admin Login</h1>

            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mb-4 w-full rounded-lg border border-gray-300 px-3 py-3 text-base outline-none transition focus:border-[#17593f] focus:ring-1 focus:ring-[#17593f]"
            />

            {loginError && (
              <p className="mb-4 text-sm text-red-600">{loginError}</p>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-[#17593f] px-4 py-3 font-semibold text-white transition hover:-translate-y-0.5"
            >
              Login
            </button>
          </form>
        </div>
      </main>
    );
  }

  return <AdminDashboard onLogout={handleLogout} />;
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [events, setEvents] = useState<ChurchEvent[]>([]);
  const [gallery, setGallery] = useState<GalleryPhoto[]>([]);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState<EventType>("meeting");
  const [repeatWeekly, setRepeatWeekly] = useState(false);
  const [dayOfWeek, setDayOfWeek] = useState(0);

  const [galleryFile, setGalleryFile] = useState<File | null>(null);
  const [galleryCaption, setGalleryCaption] = useState("");
  const [galleryStatus, setGalleryStatus] = useState("");

  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingGallery, setLoadingGallery] = useState(true);

  const loadEvents = useCallback(async () => {
    setLoadingEvents(true);

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: true });

    if (error) {
      console.error("Error loading events:", error);
      setEvents([]);
    } else {
      setEvents((data ?? []) as ChurchEvent[]);
    }

    setLoadingEvents(false);
  }, []);

  const loadGallery = useCallback(async () => {
    setLoadingGallery(true);

    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Gallery loading error:", error);
      setGallery([]);
    } else {
      setGallery((data ?? []) as GalleryPhoto[]);
    }

    setLoadingGallery(false);
  }, []);

  useEffect(() => {
    void loadEvents();
    void loadGallery();
  }, [loadEvents, loadGallery]);

  const clearEventForm = () => {
    setTitle("");
    setDate("");
    setTime("");
    setLocation("");
    setType("meeting");
    setRepeatWeekly(false);
    setDayOfWeek(0);
  };

  const handleAddEvent = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      alert("Please enter an event title.");
      return;
    }

    const newEvent = {
      title: title.trim(),
      date: date || null,
      time: time.trim() || null,
      location: location.trim() || null,
      type,
      repeat: repeatWeekly ? "weekly" : null,
      dayOfWeek,
    };

    const { error } = await supabase.from("events").insert([newEvent]);

    if (error) {
      console.error("Error adding event:", error);
      alert("Failed to add event");
      return;
    }

    alert("Event added successfully!");

    clearEventForm();
    window.location.reload();
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm("Delete this event?")) {
      return;
    }

    const { error } = await supabase.from("events").delete().eq("id", id);

    if (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event");
      return;
    }

    window.location.reload();
  };

  const handleGalleryFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGalleryFile(event.target.files?.[0] ?? null);
  };

  const handleUploadGalleryPhoto = async () => {
    if (!galleryFile) {
      alert("Please choose an image first.");
      return;
    }

    setGalleryStatus("Uploading...");

    const fileName = `${Date.now()}-${galleryFile.name.replace(
      /[^a-zA-Z0-9.-]/g,
      "_",
    )}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(fileName, galleryFile);

      if (uploadError) {
        console.error("Storage upload error:", uploadError);
        setGalleryStatus("Upload failed.");
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("gallery")
        .getPublicUrl(fileName);

      const imageUrl = publicUrlData.publicUrl;

      const { error: databaseError } = await supabase.from("gallery").insert([
        {
          img_url: imageUrl,
          caption: galleryCaption.trim() || null,
        },
      ]);

      if (databaseError) {
        console.error("Database error:", databaseError);

        await supabase.storage.from("gallery").remove([fileName]);

        setGalleryStatus("Failed to save photo.");
        return;
      }

      setGalleryStatus("Photo uploaded successfully!");
      setGalleryFile(null);
      setGalleryCaption("");

      const fileInput = document.getElementById(
        "galleryImage",
      ) as HTMLInputElement | null;

      if (fileInput) {
        fileInput.value = "";
      }

      await loadGallery();
    } catch (error) {
      console.error(error);
      setGalleryStatus("Something went wrong.");
    }
  };

  const handleDeleteGalleryPhoto = async (id: string, imageUrl: string) => {
    if (!confirm("Are you sure you want to delete this photo?")) {
      return;
    }

    try {
      const storageMarker = "/storage/v1/object/public/gallery/";
      const markerIndex = imageUrl.indexOf(storageMarker);

      if (markerIndex !== -1) {
        const storagePath = decodeURIComponent(
          imageUrl.substring(markerIndex + storageMarker.length),
        );

        if (storagePath) {
          const { error: storageError } = await supabase.storage
            .from("gallery")
            .remove([storagePath]);

          if (storageError) {
            console.error("Storage delete error:", storageError);
          }
        }
      }

      const { error: databaseError } = await supabase
        .from("gallery")
        .delete()
        .eq("id", id);

      if (databaseError) {
        console.error("Database delete error:", databaseError);
        alert("Failed to delete photo.");
        return;
      }

      await loadGallery();
    } catch (error) {
      console.error(error);
      alert("Something went wrong while deleting the photo.");
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f5f5] px-4 pb-20 pt-[120px]">
      <div className="mx-auto w-full max-w-[1200px]">
        {/* ADMIN HEADER */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="rounded-full bg-[#17593f]/10 px-3 py-1.5 text-sm font-semibold text-[#17593f]">
              🔒 Admin Mode
            </span>

            <h1 className="mt-4 text-3xl font-bold md:text-4xl">
              Church Admin Panel
            </h1>
          </div>

          <button
            type="button"
            onClick={onLogout}
            className="rounded-full bg-[#c0392b] px-5 py-2.5 font-semibold text-white transition hover:-translate-y-0.5"
          >
            Logout
          </button>
        </div>

        {/* GALLERY ADMIN */}
        <section className="mb-10 rounded-2xl bg-[#f5f5f5]">
          <h2 className="mb-5 text-3xl font-bold">Photo Gallery</h2>

          <div className="rounded-2xl bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
            <h3 className="mb-4 text-xl font-bold">Upload New Photo</h3>

            <div className="space-y-4">
              <input
                id="galleryImage"
                type="file"
                accept="image/*"
                onChange={handleGalleryFileChange}
                className="block w-full rounded-lg border border-gray-300 p-2"
              />

              <input
                type="text"
                placeholder="Photo caption (optional)"
                value={galleryCaption}
                onChange={(event) => setGalleryCaption(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-3 outline-none focus:border-[#17593f]"
              />

              <button
                type="button"
                onClick={handleUploadGalleryPhoto}
                className="rounded-lg bg-[#17593f] px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5"
              >
                Upload Photo
              </button>

              {galleryStatus && (
                <p className="text-sm text-gray-600">{galleryStatus}</p>
              )}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="mb-5 text-2xl font-bold">Current Photos</h3>

            {loadingGallery ? (
              <p className="text-gray-600">Loading photos...</p>
            ) : gallery.length === 0 ? (
              <p className="text-gray-600">No photos uploaded yet.</p>
            ) : (
              <div className="grid gap-5 [grid-template-columns:repeat(auto-fill,minmax(220px,1fr))]">
                {gallery.map((photo) => (
                  <div
                    key={photo.id}
                    className="overflow-hidden rounded-[14px] bg-white shadow-[0_5px_20px_rgba(0,0,0,0.08)]"
                  >
                    <img
                      src={photo.img_url}
                      alt={photo.caption || "Church Photo"}
                      className="block h-[200px] w-full object-cover"
                    />

                    <div className="p-4">
                      <p className="mb-3 text-gray-700">
                        {photo.caption || "No caption"}
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteGalleryPhoto(photo.id, photo.img_url)
                        }
                        className="rounded-md bg-[#c0392b] px-3.5 py-2 text-sm font-semibold text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* EVENTS ADMIN */}
        <section className="mb-10">
          <h2 className="mb-6 text-3xl font-bold">Church Event Admin Panel</h2>

          <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
            {/* FORM */}
            <form
              onSubmit={handleAddEvent}
              className="flex w-full flex-col gap-3 rounded-2xl bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
            >
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Event Title"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base outline-none focus:border-[#17593f]"
              />

              <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base outline-none focus:border-[#17593f]"
              />

              <input
                value={time}
                onChange={(event) => setTime(event.target.value)}
                placeholder="Time (e.g. 6:00 PM)"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base outline-none focus:border-[#17593f]"
              />

              <input
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="Location"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base outline-none focus:border-[#17593f]"
              />

              <select
                value={type}
                onChange={(event) => setType(event.target.value as EventType)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base outline-none focus:border-[#17593f]"
              >
                {eventTypes.map((eventType) => (
                  <option key={eventType} value={eventType}>
                    {eventType.charAt(0).toUpperCase() + eventType.slice(1)}
                  </option>
                ))}
              </select>

              <label className="flex cursor-pointer items-center gap-2 py-1">
                <span className="whitespace-nowrap font-medium">
                  Repeat Weekly
                </span>

                <input
                  type="checkbox"
                  checked={repeatWeekly}
                  onChange={(event) => setRepeatWeekly(event.target.checked)}
                  className="h-4 w-4"
                />
              </label>

              <select
                value={dayOfWeek}
                onChange={(event) => setDayOfWeek(Number(event.target.value))}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base outline-none focus:border-[#17593f]"
              >
                {daysOfWeek.map((day, index) => (
                  <option key={day} value={index}>
                    {day}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                className="mt-1 rounded-lg bg-[#17593f] px-4 py-3 font-semibold text-white transition hover:-translate-y-0.5"
              >
                Add Event
              </button>
            </form>

            {/* CURRENT EVENTS */}
            <div className="rounded-2xl bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
              <h2 className="mb-5 text-2xl font-bold">Current Events</h2>

              {loadingEvents ? (
                <p className="text-gray-600">Loading events...</p>
              ) : events.length === 0 ? (
                <p className="text-gray-600">No events found.</p>
              ) : (
                <div className="grid gap-3">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="rounded-xl border border-gray-200 p-4"
                    >
                      <h3 className="mb-2 text-lg font-bold">{event.title}</h3>

                      <p className="text-sm text-gray-700">
                        <strong>Date:</strong> {event.date || "Weekly Event"}
                      </p>

                      <p className="text-sm text-gray-700">
                        <strong>Time:</strong> {event.time || "Not set"}
                      </p>

                      <p className="text-sm text-gray-700">
                        <strong>Location:</strong> {event.location || "Not set"}
                      </p>

                      <p className="text-sm text-gray-700">
                        <strong>Type:</strong> {event.type}
                      </p>

                      {event.repeat === "weekly" && (
                        <p className="mt-1 text-sm font-semibold text-[#17593f]">
                          Repeats weekly
                        </p>
                      )}

                      <button
                        type="button"
                        onClick={() => handleDeleteEvent(event.id)}
                        className="mt-4 rounded-md bg-[#c0392b] px-4 py-2 text-sm font-semibold text-white"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CALENDAR PREVIEW */}
        <section>
          <h2 className="mb-6 text-3xl font-bold">Calendar Preview</h2>

          <div className="overflow-hidden rounded-2xl">
            <EventCalendar />
          </div>
        </section>
      </div>
    </main>
  );
}
