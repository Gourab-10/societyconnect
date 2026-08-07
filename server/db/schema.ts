import db from './connection';

export function initializeSchema() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phone TEXT NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL, -- owner, tenant, admin, guard
      flatId TEXT,
      flatNumber TEXT,
      tower TEXT,
      isOwner INTEGER DEFAULT 0,
      avatar TEXT,
      vehiclesCount INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS flats (
      id TEXT PRIMARY KEY,
      tower TEXT NOT NULL,
      unitNumber TEXT NOT NULL,
      floor INTEGER NOT NULL,
      areaSqFt INTEGER NOT NULL,
      ownerName TEXT NOT NULL,
      ownerPhone TEXT NOT NULL,
      ownerEmail TEXT NOT NULL,
      isRented INTEGER DEFAULT 0,
      tenantName TEXT,
      tenantPhone TEXT,
      parkingSlot TEXT NOT NULL,
      occupancyStatus TEXT NOT NULL -- owner_occupied, tenant_occupied, vacant
    );

    CREATE TABLE IF NOT EXISTS bills (
      id TEXT PRIMARY KEY,
      flatId TEXT NOT NULL,
      flatNumber TEXT NOT NULL,
      tower TEXT NOT NULL,
      residentName TEXT NOT NULL,
      month TEXT NOT NULL,
      year INTEGER NOT NULL,
      dueDate TEXT NOT NULL,
      subtotal REAL NOT NULL,
      lateFee REAL NOT NULL,
      totalAmount REAL NOT NULL,
      status TEXT NOT NULL, -- paid, unpaid, overdue
      paidDate TEXT,
      paymentMethod TEXT,
      transactionRef TEXT,
      FOREIGN KEY (flatId) REFERENCES flats (id)
    );

    CREATE TABLE IF NOT EXISTS bill_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      billId TEXT NOT NULL,
      description TEXT NOT NULL,
      amount REAL NOT NULL,
      category TEXT NOT NULL,
      FOREIGN KEY (billId) REFERENCES bills (id)
    );

    CREATE TABLE IF NOT EXISTS tenant_nocs (
      id TEXT PRIMARY KEY,
      flatId TEXT NOT NULL,
      flatNumber TEXT NOT NULL,
      tower TEXT NOT NULL,
      ownerId TEXT NOT NULL,
      tenantName TEXT NOT NULL,
      tenantPhone TEXT NOT NULL,
      tenantEmail TEXT NOT NULL,
      leaseStartDate TEXT NOT NULL,
      leaseEndDate TEXT NOT NULL,
      monthlyRent REAL NOT NULL,
      policeVerificationStatus TEXT NOT NULL,
      nocStatus TEXT NOT NULL,
      moveInDate TEXT,
      moveOutDate TEXT,
      documentUrl TEXT,
      createdAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS complaints (
      id TEXT PRIMARY KEY,
      flatNumber TEXT NOT NULL,
      tower TEXT NOT NULL,
      residentName TEXT NOT NULL,
      category TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      priority TEXT NOT NULL,
      status TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      slaDeadline TEXT NOT NULL,
      assignedTechnician TEXT,
      resolutionNotes TEXT,
      rating INTEGER
    );

    CREATE TABLE IF NOT EXISTS visitors (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      type TEXT NOT NULL,
      flatNumber TEXT NOT NULL,
      tower TEXT NOT NULL,
      passCode TEXT NOT NULL,
      entryTime TEXT NOT NULL,
      exitTime TEXT,
      status TEXT NOT NULL,
      vehicleNumber TEXT
    );

    CREATE TABLE IF NOT EXISTS staff (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      phone TEXT NOT NULL,
      flatsAssigned TEXT NOT NULL, -- JSON string
      entryTime TEXT NOT NULL,
      exitTime TEXT,
      status TEXT NOT NULL,
      rating REAL NOT NULL,
      reviewsCount INTEGER NOT NULL,
      experienceYears INTEGER NOT NULL,
      policeVerified INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS amenities (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      capacity INTEGER NOT NULL,
      hourlyRate REAL NOT NULL,
      securityDeposit REAL NOT NULL,
      image TEXT NOT NULL,
      openingHours TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS amenity_bookings (
      id TEXT PRIMARY KEY,
      amenityId TEXT NOT NULL,
      amenityName TEXT NOT NULL,
      residentName TEXT NOT NULL,
      flatNumber TEXT NOT NULL,
      tower TEXT NOT NULL,
      date TEXT NOT NULL,
      timeSlot TEXT NOT NULL,
      amountPaid REAL NOT NULL,
      depositPaid REAL NOT NULL,
      status TEXT NOT NULL,
      createdAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS resolutions (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      category TEXT NOT NULL,
      startDate TEXT NOT NULL,
      endDate TEXT NOT NULL,
      status TEXT NOT NULL,
      totalVotes INTEGER NOT NULL,
      quorumPercentage REAL NOT NULL
    );

    CREATE TABLE IF NOT EXISTS resolution_options (
      id TEXT PRIMARY KEY,
      resolutionId TEXT NOT NULL,
      label TEXT NOT NULL,
      votes INTEGER NOT NULL,
      FOREIGN KEY (resolutionId) REFERENCES resolutions (id)
    );

    CREATE TABLE IF NOT EXISTS documents (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      uploadDate TEXT NOT NULL,
      fileSize TEXT NOT NULL,
      accessLevel TEXT NOT NULL,
      downloadUrl TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS vendors (
      id TEXT PRIMARY KEY,
      serviceName TEXT NOT NULL,
      vendorName TEXT NOT NULL,
      contactPerson TEXT NOT NULL,
      phone TEXT NOT NULL,
      monthlyCost REAL NOT NULL,
      contractStartDate TEXT NOT NULL,
      contractEndDate TEXT NOT NULL,
      status TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS water_tankers (
      id TEXT PRIMARY KEY,
      date TEXT NOT NULL,
      vendorName TEXT NOT NULL,
      capacityLiters INTEGER NOT NULL,
      costPerTanker REAL NOT NULL,
      verifiedByGuard TEXT NOT NULL,
      slipNumber TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS dg_logs (
      id TEXT PRIMARY KEY,
      date TEXT NOT NULL,
      dieselLitresAdded REAL NOT NULL,
      cost REAL NOT NULL,
      runtimeHours REAL NOT NULL,
      powerCutDuration TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS ev_sessions (
      id TEXT PRIMARY KEY,
      flatNumber TEXT NOT NULL,
      tower TEXT NOT NULL,
      chargerSlot TEXT NOT NULL,
      kWhConsumed REAL NOT NULL,
      totalCost REAL NOT NULL,
      date TEXT NOT NULL,
      status TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS clearances (
      id TEXT PRIMARY KEY,
      flatNumber TEXT NOT NULL,
      tower TEXT NOT NULL,
      residentName TEXT NOT NULL,
      moveOutDate TEXT NOT NULL,
      duesCleared INTEGER DEFAULT 0,
      parkingBadgeReturned INTEGER DEFAULT 0,
      liftPaddingRequested INTEGER DEFAULT 0,
      status TEXT NOT NULL
    );
  `);
}
