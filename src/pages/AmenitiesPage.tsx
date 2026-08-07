import React, { useState } from 'react';
import { useSocietyStore } from '@/hooks/useSocietyStore';
import { Amenity } from '@/types/society';
import {
  CalendarCheck,
  Clock,
  Users,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';

export const AmenitiesPage: React.FC = () => {
  const { amenities, bookings, addBooking, activeFlat } = useSocietyStore();
  const [selectedAmenity, setSelectedAmenity] = useState<Amenity | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Form State
  const [bookingDate, setBookingDate] = useState('2026-08-20');
  const [timeSlot, setTimeSlot] = useState('06:00 PM - 10:00 PM');

  const handleOpenBooking = (amenity: Amenity) => {
    setSelectedAmenity(amenity);
    setShowBookingModal(true);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAmenity) return;

    addBooking({
      amenityId: selectedAmenity.id,
      amenityName: selectedAmenity.name,
      residentName: activeFlat.ownerName,
      flatNumber: activeFlat.unitNumber,
      tower: activeFlat.tower,
      date: bookingDate,
      timeSlot,
      amountPaid: selectedAmenity.hourlyRate * 4,
      depositPaid: selectedAmenity.securityDeposit,
    });

    setShowBookingModal(false);
    toast.success(`Amenity Reserved Successfully!`, {
      description: `${selectedAmenity.name} booked for ${bookingDate} (${timeSlot}). Receipt & Pass generated.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Smart Amenity Reservation Suite</h1>
          <p className="text-xs text-slate-500">Real-time slot availability, automated blackout conflict check & security deposit tracking</p>
        </div>
      </div>

      {/* Amenity Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {amenities.map((a) => (
          <div key={a.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs space-y-4 hover:border-emerald-500/40 transition-all group flex flex-col justify-between">
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={a.image}
                alt={a.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                <span className="font-display font-bold text-lg">{a.name}</span>
                <span className="px-2.5 py-1 rounded-xl bg-emerald-600 font-semibold text-xs shadow-md">
                  ₹{a.hourlyRate}/hr
                </span>
              </div>
            </div>

            <div className="p-6 space-y-4 pt-0">
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{a.description}</p>

              <div className="grid grid-cols-3 gap-2 text-xs text-slate-500">
                <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-center">
                  <Users className="h-4 w-4 mx-auto text-emerald-600 mb-1" />
                  <span>Cap: {a.capacity} pax</span>
                </div>
                <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-center">
                  <Clock className="h-4 w-4 mx-auto text-blue-600 mb-1" />
                  <span>{a.openingHours}</span>
                </div>
                <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-center">
                  <ShieldCheck className="h-4 w-4 mx-auto text-purple-600 mb-1" />
                  <span>Dep: ₹{a.securityDeposit}</span>
                </div>
              </div>

              <button
                onClick={() => handleOpenBooking(a)}
                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 font-semibold text-xs text-white shadow-md shadow-emerald-600/20 active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <CalendarCheck className="h-4 w-4" />
                <span>Reserve Time Slot</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Active Bookings Registry */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
        <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">Active Society Reservations</h3>

        <div className="space-y-3">
          {bookings.map((b) => (
            <div key={b.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">{b.amenityName}</h4>
                <p className="text-[11px] text-slate-500">{b.tower} {b.flatNumber} ({b.residentName}) &bull; Date: {b.date}</p>
                <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">Slot: {b.timeSlot}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Paid: ₹{b.amountPaid}</span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 uppercase">
                  {b.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedAmenity && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleConfirmBooking} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">Reserve {selectedAmenity.name}</h3>
              <p className="text-xs text-slate-500">Hourly Rate: ₹{selectedAmenity.hourlyRate}/hr &bull; Security Deposit: ₹{selectedAmenity.securityDeposit}</p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Select Date *</label>
                <input
                  type="date"
                  required
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="mt-1 w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Select Time Window *</label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="mt-1 w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="09:00 AM - 01:00 PM">Morning Slot (09:00 AM - 01:00 PM)</option>
                  <option value="02:00 PM - 06:00 PM">Afternoon Slot (02:00 PM - 06:00 PM)</option>
                  <option value="06:00 PM - 10:00 PM">Evening Gala Slot (06:00 PM - 10:00 PM)</option>
                </select>
              </div>

              <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 space-y-1">
                <div className="flex justify-between font-semibold">
                  <span>Slot Fee (4 Hours):</span>
                  <span>₹{selectedAmenity.hourlyRate * 4}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Refundable Security Deposit:</span>
                  <span>₹{selectedAmenity.securityDeposit}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-200 dark:border-slate-700 text-emerald-600 font-bold text-sm">
                  <span>Total Payable Now:</span>
                  <span>₹{(selectedAmenity.hourlyRate * 4) + selectedAmenity.securityDeposit}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowBookingModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-600/30"
              >
                Confirm Booking
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
