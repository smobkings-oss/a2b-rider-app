"use client";

import { useState, useEffect } from "react";

interface Ride {
  id: string;
  pickup: string;
  dropoff: string;
  type: "instant" | "scheduled";
  scheduledTime?: string;
  estimatedPrice: number;
  status: "requested" | "accepted" | "in-progress" | "completed";
  createdAt: string;
}

export default function Home() {
  const [isHoppedOn, setIsHoppedOn] = useState(false);
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [rides, setRides] = useState<Ride[]>([]);
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [rideType, setRideType] = useState<"instant" | "scheduled">("instant");
  const [scheduledTime, setScheduledTime] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("a2b-rides");
    if (saved) setRides(JSON.parse(saved));
    const user = localStorage.getItem("a2b-user");
    if (user) {
      const u = JSON.parse(user);
      setUserName(u.name);
      setPhone(u.phone);
      setIsHoppedOn(true);
    }
  }, []);

  const saveRides = (newRides: Ride[]) => {
    setRides(newRides);
    localStorage.setItem("a2b-rides", JSON.stringify(newRides));
  };

  const hopOn = () => {
    if (!userName || !phone) return alert("Please enter name and phone to hop on.");
    localStorage.setItem("a2b-user", JSON.stringify({ name: userName, phone }));
    setIsHoppedOn(true);
    setShowForm(true);
  };

  const estimatePrice = (p: string, d: string) => {
    // Mock estimate: base $8 + random based on length
    const base = 8;
    const distanceFactor = (p.length + d.length) * 0.15;
    return Math.round((base + distanceFactor) * 100) / 100;
  };

  const placeRide = () => {
    if (!pickup || !dropoff) return alert("Please enter pickup and dropoff locations.");
    if (rideType === "scheduled" && !scheduledTime) return alert("Please select a date and time for scheduled ride.");

    const price = estimatePrice(pickup, dropoff);
    const newRide: Ride = {
      id: Date.now().toString(),
      pickup,
      dropoff,
      type: rideType,
      scheduledTime: rideType === "scheduled" ? scheduledTime : undefined,
      estimatedPrice: price,
      status: "requested",
      createdAt: new Date().toISOString(),
    };

    saveRides([newRide, ...rides]);
    alert(`Ride requested! Estimated $${price.toFixed(2)}. A driver will be matched soon.`);
    setPickup("");
    setDropoff("");
    setScheduledTime("");
    setShowForm(false);
  };

  const logout = () => {
    localStorage.removeItem("a2b-user");
    setIsHoppedOn(false);
    setUserName("");
    setPhone("");
  };

  if (!isHoppedOn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-black">
        <div className="max-w-md w-full text-center space-y-8">
          <div>
            <h1 className="text-5xl font-bold gold-gradient mb-2">A2B Rides</h1>
            <p className="text-gold-light text-lg">Premium local rides • NW Ohio</p>
            <p className="text-gray-400 mt-2">Hop on for instant or scheduled rides</p>
          </div>

          <div className="bg-zinc-900/50 border border-gold/30 rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gold">Hop On</h2>
            <input
              type="text"
              placeholder="Your Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-lg focus:border-gold outline-none"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-lg focus:border-gold outline-none"
            />
            <button
              onClick={hopOn}
              className="w-full btn-gold py-4 rounded-xl text-lg font-bold"
            >
              Hop On Now
            </button>
          </div>

          <p className="text-sm text-gray-500">
            Instant rides or schedule ahead. Transparent pricing. Local Tesla fleet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 p-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold gold-gradient">A2B Rides</h1>
          <p className="text-sm text-gray-400">Welcome, {userName}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-gold px-4 py-2 rounded-lg text-sm"
          >
            {showForm ? "View Rides" : "New Ride"}
          </button>
          <button
            onClick={logout}
            className="px-4 py-2 border border-zinc-700 rounded-lg text-sm hover:bg-zinc-900"
          >
            Hop Off
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4 space-y-6">
        {showForm ? (
          <div className="bg-zinc-900/70 border border-gold/20 rounded-2xl p-6 space-y-5">
            <h2 className="text-2xl font-bold text-gold">Request a Ride</h2>

            <div className="flex gap-3">
              <button
                onClick={() => setRideType("instant")}
                className={`flex-1 py-3 rounded-lg font-medium ${
                  rideType === "instant"
                    ? "bg-gold text-black"
                    : "bg-zinc-800 border border-zinc-700"
                }`}
              >
                Instant
              </button>
              <button
                onClick={() => setRideType("scheduled")}
                className={`flex-1 py-3 rounded-lg font-medium ${
                  rideType === "scheduled"
                    ? "bg-gold text-black"
                    : "bg-zinc-800 border border-zinc-700"
                }`}
              >
                Scheduled
              </button>
            </div>

            <input
              type="text"
              placeholder="Pickup location (e.g. 123 Main St, Toledo)"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-lg focus:border-gold outline-none"
            />
            <input
              type="text"
              placeholder="Dropoff location (e.g. Toledo Airport)"
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-lg focus:border-gold outline-none"
            />

            {rideType === "scheduled" && (
              <input
                type="datetime-local"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-lg focus:border-gold outline-none text-white"
              />
            )}

            {pickup && dropoff && (
              <div className="bg-black/50 p-4 rounded-lg border border-gold/30">
                <p className="text-gold font-medium">
                  Estimated: ${estimatePrice(pickup, dropoff).toFixed(2)}
                </p>
                <p className="text-sm text-gray-400">
                  Base + distance. Final price confirmed on match.
                </p>
              </div>
            )}

            <button
              onClick={placeRide}
              className="w-full btn-gold py-4 rounded-xl text-lg font-bold"
            >
              Place {rideType === "instant" ? "Instant" : "Scheduled"} Ride Order
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Your Rides</h2>
            {rides.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p>No rides yet.</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="mt-4 btn-gold px-6 py-3 rounded-lg"
                >
                  Request Your First Ride
                </button>
              </div>
            ) : (
              rides.map((ride) => (
                <div
                  key={ride.id}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">
                        {ride.pickup} → {ride.dropoff}
                      </p>
                      <p className="text-sm text-gray-400">
                        {ride.type === "instant" ? "Instant" : `Scheduled: ${new Date(ride.scheduledTime!).toLocaleString()}`}
                      </p>
                    </div>
                    <span className="text-gold font-bold">${ride.estimatedPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="capitalize px-2 py-1 bg-zinc-800 rounded text-gold-light">
                      {ride.status}
                    </span>
                    <span className="text-gray-500">
                      {new Date(ride.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      <footer className="text-center text-xs text-gray-600 py-8 border-t border-zinc-900 mt-12">
        A2B Rides • Premium local service • NW Ohio & Michigan expansion
      </footer>
    </div>
  );
}
