import db from './connection';
import bcrypt from 'bcryptjs';

const INITIAL_FLATS = [
  { id: 'f-A101', tower: 'Tower A', unitNumber: 'A-101', floor: 1, areaSqFt: 1450, ownerName: 'Rajesh Sharma', ownerPhone: '+91 98765 43210', ownerEmail: 'rajesh.sharma@example.com', isRented: 0, parkingSlot: 'P-A101', occupancyStatus: 'owner_occupied', tenantName: null, tenantPhone: null },
  { id: 'f-A102', tower: 'Tower A', unitNumber: 'A-102', floor: 1, areaSqFt: 1680, ownerName: 'Priya Nair', ownerPhone: '+91 98220 11223', ownerEmail: 'priya.nair@example.com', isRented: 1, tenantName: 'Vikram Mehta', tenantPhone: '+91 97111 88990', parkingSlot: 'P-A102', occupancyStatus: 'tenant_occupied' },
  { id: 'f-A201', tower: 'Tower A', unitNumber: 'A-201', floor: 2, areaSqFt: 1450, ownerName: 'Amitav Ghosh', ownerPhone: '+91 98333 44556', ownerEmail: 'amitav.ghosh@example.com', isRented: 0, parkingSlot: 'P-A201', occupancyStatus: 'owner_occupied', tenantName: null, tenantPhone: null },
  { id: 'f-B101', tower: 'Tower B', unitNumber: 'B-101', floor: 1, areaSqFt: 1850, ownerName: 'Siddharth Rao', ownerPhone: '+91 98444 55667', ownerEmail: 'siddharth.rao@example.com', isRented: 0, parkingSlot: 'P-B101', occupancyStatus: 'owner_occupied', tenantName: null, tenantPhone: null },
  { id: 'f-B102', tower: 'Tower B', unitNumber: 'B-102', floor: 1, areaSqFt: 1850, ownerName: 'Kavita Reddy', ownerPhone: '+91 98555 66778', ownerEmail: 'kavita.reddy@example.com', isRented: 1, tenantName: 'Ananya Gupta', tenantPhone: '+91 96222 33445', parkingSlot: 'P-B102', occupancyStatus: 'tenant_occupied' },
  { id: 'f-C301', tower: 'Tower C', unitNumber: 'C-301', floor: 3, areaSqFt: 2100, ownerName: 'Dr. Alok Verma', ownerPhone: '+91 98666 77889', ownerEmail: 'alok.verma@example.com', isRented: 0, parkingSlot: 'P-C301', occupancyStatus: 'owner_occupied', tenantName: null, tenantPhone: null },
  { id: 'f-D402', tower: 'Tower D', unitNumber: 'D-402', floor: 4, areaSqFt: 1250, ownerName: 'Sunita Deshmukh', ownerPhone: '+91 98777 88990', ownerEmail: 'sunita.d@example.com', isRented: 0, parkingSlot: 'P-D402', occupancyStatus: 'owner_occupied', tenantName: null, tenantPhone: null },
];

export async function seedData() {
  const flatsCount = db.prepare('SELECT COUNT(*) as count FROM flats').get() as { count: number };
  if (flatsCount.count > 0) {
    console.log('Database already seeded');
    return;
  }

  console.log('Seeding initial data...');
  const defaultPassword = await bcrypt.hash('password123', 10);

  // Insert Flats and Users
  const insertFlat = db.prepare(`
    INSERT INTO flats (id, tower, unitNumber, floor, areaSqFt, ownerName, ownerPhone, ownerEmail, isRented, tenantName, tenantPhone, parkingSlot, occupancyStatus)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertUser = db.prepare(`
    INSERT INTO users (id, name, email, phone, password, role, flatId, flatNumber, tower, isOwner)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  INITIAL_FLATS.forEach(flat => {
    insertFlat.run(flat.id, flat.tower, flat.unitNumber, flat.floor, flat.areaSqFt, flat.ownerName, flat.ownerPhone, flat.ownerEmail, flat.isRented, flat.tenantName, flat.tenantPhone, flat.parkingSlot, flat.occupancyStatus);
    
    // Seed Owner
    insertUser.run(`u-o-${flat.id}`, flat.ownerName, flat.ownerEmail, flat.ownerPhone, defaultPassword, 'owner', flat.id, flat.unitNumber, flat.tower, 1);
    
    // Seed Tenant if rented
    if (flat.isRented && flat.tenantName) {
      insertUser.run(`u-t-${flat.id}`, flat.tenantName, `${flat.tenantName.toLowerCase().replace(' ', '.')}@example.com`, flat.tenantPhone, defaultPassword, 'tenant', flat.id, flat.unitNumber, flat.tower, 0);
    }
  });

  // Admin and Guard Users
  insertUser.run('u-admin', 'Admin User', 'admin@societyconnect.com', '+91 00000 00000', defaultPassword, 'admin', null, null, null, 0);
  insertUser.run('u-guard', 'Main Gate Guard', 'guard@societyconnect.com', '+91 11111 11111', defaultPassword, 'guard', null, null, null, 0);

  // Seed Bills
  const insertBill = db.prepare(`
    INSERT INTO bills (id, flatId, flatNumber, tower, residentName, month, year, dueDate, subtotal, lateFee, totalAmount, status, paidDate, paymentMethod, transactionRef)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertBillItem = db.prepare(`
    INSERT INTO bill_items (billId, description, amount, category)
    VALUES (?, ?, ?, ?)
  `);

  const bill1 = { id: 'BILL-2026-08-A101', flatId: 'f-A101', flatNumber: 'A-101', tower: 'Tower A', residentName: 'Rajesh Sharma', month: 'August', year: 2026, dueDate: '2026-08-15', subtotal: 4350, lateFee: 0, totalAmount: 4350, status: 'unpaid', items: [{ description: 'Sq.Ft Maintenance (1,450 sqft @ ₹2.5/sqft)', amount: 3625, category: 'maintenance' }, { description: 'Clubhouse & Amenities Levy', amount: 450, category: 'utility' }, { description: 'Sinking & Corpus Fund', amount: 275, category: 'corpus' }] };
  const bill2 = { id: 'BILL-2026-08-A102', flatId: 'f-A102', flatNumber: 'A-102', tower: 'Tower A', residentName: 'Vikram Mehta (Tenant)', month: 'August', year: 2026, dueDate: '2026-08-15', subtotal: 5040, lateFee: 0, totalAmount: 5040, status: 'paid', paidDate: '2026-08-02', paymentMethod: 'UPI (GPay)', transactionRef: 'UPI/6281902819/SUCCESS', items: [{ description: 'Sq.Ft Maintenance (1,680 sqft @ ₹2.5/sqft)', amount: 4200, category: 'maintenance' }, { description: 'Clubhouse & Gym Levy', amount: 500, category: 'utility' }, { description: 'Diesel Generator Backup Charges', amount: 340, category: 'utility' }] };

  [bill1, bill2].forEach((b: any) => {
    insertBill.run(b.id, b.flatId, b.flatNumber, b.tower, b.residentName, b.month, b.year, b.dueDate, b.subtotal, b.lateFee, b.totalAmount, b.status, b.paidDate || null, b.paymentMethod || null, b.transactionRef || null);
    b.items.forEach((item: any) => insertBillItem.run(b.id, item.description, item.amount, item.category));
  });

  // Seed Amenities
  const insertAmenity = db.prepare(`
    INSERT INTO amenities (id, name, description, capacity, hourlyRate, securityDeposit, image, openingHours)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  insertAmenity.run('AMN-CLUB', 'Grand Banquet & Clubhouse', 'Air-conditioned hall with audio system.', 120, 1500, 5000, 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3', '08:00 AM - 11:00 PM');
  insertAmenity.run('AMN-POOL', 'Olympic Swimming Pool & Deck', 'Temperature-controlled lap pool.', 35, 200, 0, 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7', '06:00 AM - 09:30 PM');

  // Add more seeding as required...
  
  console.log('Seeding completed successfully');
}
