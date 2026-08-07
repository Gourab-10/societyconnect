import React, { useState } from 'react';
import { useSocietyStore } from '@/hooks/useSocietyStore';
import { Bill } from '@/types/society';
import {
  Receipt,
  CheckCircle2,
  Clock,
  AlertTriangle,
  QrCode,
  CreditCard,
  Download,
  ShieldCheck,
  Building,
  DollarSign,
  FileText
} from 'lucide-react';
import { toast } from 'sonner';

export const BillingPage: React.FC = () => {
  const { bills, payBill, activeFlat, role } = useSocietyStore();
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState<Bill | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');

  const filteredBills = bills.filter(b => role === 'admin' || b.flatNumber === activeFlat?.unitNumber);

  const handleOpenPayment = (bill: Bill) => {
    setSelectedBill(bill);
    setShowPaymentModal(true);
  };

  const handleConfirmPayment = () => {
    if (!selectedBill) return;
    payBill(selectedBill.id, paymentMethod.toUpperCase());
    setShowPaymentModal(false);
    toast.success(`Payment Successful!`, {
      description: `Receipt generated for ${selectedBill.month} ${selectedBill.year} maintenance bill.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Smart Billing & Maintenance Engine</h1>
          <p className="text-xs text-slate-500">Transparent itemized breakdowns, automated late-fee calculation & instant UPI receipts</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4" /> 100% Tax Compliant Ledger
          </span>
        </div>
      </div>

      {/* Bill List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Bills Table */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">Maintenance Statements</h3>
            <span className="text-xs text-slate-400">Showing {filteredBills.length} records</span>
          </div>

          <div className="space-y-4">
            {filteredBills.map((b) => (
              <div key={b.id} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 space-y-4 hover:border-emerald-500/40 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/60 dark:border-slate-700/60 pb-3">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-xl grid place-items-center ${
                      b.status === 'paid' ? 'bg-emerald-500/10 text-emerald-600' : b.status === 'overdue' ? 'bg-red-500/10 text-red-600' : 'bg-amber-500/10 text-amber-600'
                    }`}>
                      <Receipt className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{b.month} {b.year} Maintenance</h4>
                      <p className="text-xs text-slate-500">{b.tower} &bull; Flat {b.flatNumber} ({b.residentName})</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      b.status === 'paid' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' :
                      b.status === 'overdue' ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {b.status}
                    </span>

                    {b.status !== 'paid' ? (
                      <button
                        onClick={() => handleOpenPayment(b)}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-md shadow-emerald-600/20 active:scale-95 transition-all"
                      >
                        Pay Now ₹{b.totalAmount.toLocaleString()}
                      </button>
                    ) : (
                      <button
                        onClick={() => setShowReceiptModal(b)}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs hover:bg-slate-300 transition-colors flex items-center gap-1.5"
                      >
                        <FileText className="h-3.5 w-3.5" /> Receipt
                      </button>
                    )}
                  </div>
                </div>

                {/* Itemized Breakdown */}
                <div className="space-y-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Itemized Fee Breakdown</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {b.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-xs">
                        <span className="text-slate-600 dark:text-slate-400 truncate max-w-[200px]">{item.description}</span>
                        <span className="font-semibold text-slate-900 dark:text-white">₹{item.amount.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 text-slate-500 border-t border-slate-200/40 dark:border-slate-700/40">
                  <span>Due Date: <strong className="text-slate-700 dark:text-slate-300">{b.dueDate}</strong></span>
                  <span className="font-display font-bold text-sm text-slate-900 dark:text-white">Total: ₹{b.totalAmount.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Transparent Policy & Defaulter Matrix */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">Transparent Calculation Formula</h3>
            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-1">
                <p className="font-semibold text-slate-900 dark:text-white">1. Square Foot Base Rate</p>
                <p className="text-slate-500">₹2.50 per sq.ft calculated based on flat area in master title deed.</p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-1">
                <p className="font-semibold text-slate-900 dark:text-white">2. Equal Utility Split</p>
                <p className="text-slate-500">Security guards, lift maintenance, and common lighting shared equally across units.</p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-1">
                <p className="font-semibold text-slate-900 dark:text-white">3. Automated Late Penalty</p>
                <p className="text-slate-500">18% annual simple interest applied automatically after 15th of the month.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedBill && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">Pay Maintenance Dues</h3>
                <p className="text-xs text-slate-500">{selectedBill.month} {selectedBill.year} &bull; {selectedBill.tower} {selectedBill.flatNumber}</p>
              </div>
              <span className="font-display font-bold text-xl text-emerald-600">₹{selectedBill.totalAmount.toLocaleString()}</span>
            </div>

            {/* Payment Method Options */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Choose Payment Method:</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-2xl border text-center space-y-1 transition-all ${
                    paymentMethod === 'upi' ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 font-bold' : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <QrCode className="h-5 w-5 mx-auto text-emerald-600" />
                  <span className="text-xs block">UPI / QR</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-2xl border text-center space-y-1 transition-all ${
                    paymentMethod === 'card' ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 font-bold' : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <CreditCard className="h-5 w-5 mx-auto text-emerald-600" />
                  <span className="text-xs block">Debit / Credit</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3 rounded-2xl border text-center space-y-1 transition-all ${
                    paymentMethod === 'netbanking' ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 font-bold' : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <Building className="h-5 w-5 mx-auto text-emerald-600" />
                  <span className="text-xs block">NetBanking</span>
                </button>
              </div>
            </div>

            {/* UPI QR Display Simulation */}
            {paymentMethod === 'upi' && (
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-center space-y-2">
                <div className="h-32 w-32 mx-auto bg-white p-2 rounded-xl shadow-inner grid place-items-center">
                  <QrCode className="h-28 w-28 text-slate-900" />
                </div>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">Scan using GPay, PhonePe, Paytm, or BHIM</p>
                <p className="text-[11px] font-mono text-slate-500">UPI VPA: societyconnect.society@icici</p>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPayment}
                className="px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-600/30"
              >
                Confirm Instant Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Digital Receipt Modal */}
      {showReceiptModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6">
            <div className="text-center space-y-1 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="h-12 w-12 mx-auto rounded-2xl bg-emerald-500/10 text-emerald-600 grid place-items-center">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">SOCIETYCONNECT MAINTENANCE RECEIPT</h3>
              <p className="text-xs text-slate-500">Official Society Payment Vouch</p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
                <span className="text-slate-500">Receipt Ref:</span>
                <span className="font-mono font-semibold text-slate-900 dark:text-white">{showReceiptModal.transactionRef || 'PAY/99210/SUCCESS'}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
                <span className="text-slate-500">Unit:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{showReceiptModal.tower} - {showReceiptModal.flatNumber}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
                <span className="text-slate-500">Resident:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{showReceiptModal.residentName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
                <span className="text-slate-500">Billing Period:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{showReceiptModal.month} {showReceiptModal.year}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
                <span className="text-slate-500">Payment Date:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{showReceiptModal.paidDate}</span>
              </div>
              <div className="flex justify-between pt-2 text-sm font-bold text-slate-900 dark:text-white">
                <span>Amount Paid:</span>
                <span className="text-emerald-600">₹{showReceiptModal.totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setShowReceiptModal(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
              >
                Close
              </button>
              <button
                onClick={() => {
                  toast.success('Downloading official PDF receipt...');
                  setShowReceiptModal(null);
                }}
                className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl flex items-center gap-1.5"
              >
                <Download className="h-3.5 w-3.5" /> Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
