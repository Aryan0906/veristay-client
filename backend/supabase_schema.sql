-- colleges
CREATE TABLE colleges (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    area TEXT NOT NULL,
    lat FLOAT NOT NULL,
    long FLOAT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- hostels
CREATE TABLE hostels (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    price_min INTEGER NOT NULL,
    price_max INTEGER NOT NULL,
    lat FLOAT NOT NULL,
    long FLOAT NOT NULL,
    college_id INTEGER REFERENCES colleges(id),
    amenities TEXT[] DEFAULT '{}',
    images TEXT[] DEFAULT '{}',
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- food_vendors
CREATE TABLE food_vendors (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    address TEXT NOT NULL,
    lat FLOAT NOT NULL,
    long FLOAT NOT NULL,
    price_min INTEGER NOT NULL,
    price_max INTEGER NOT NULL,
    menu_items TEXT[] DEFAULT '{}',
    hygiene_rating FLOAT DEFAULT 0.0,
    images TEXT[] DEFAULT '{}',
    college_id INTEGER REFERENCES colleges(id),
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- reviews
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    hostel_id INTEGER REFERENCES hostels(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL,
    rating FLOAT NOT NULL,
    comment TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
