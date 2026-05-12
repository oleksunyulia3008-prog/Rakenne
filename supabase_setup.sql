-- Create the books table
CREATE TABLE books (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    img TEXT,
    rating REAL DEFAULT 0,
    votes INTEGER DEFAULT 0,
    category TEXT DEFAULT 'other'
);

-- Create the profiles table for users
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    name TEXT,
    username TEXT,
    email TEXT UNIQUE
);

-- Create the favorites table
CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    book_id TEXT REFERENCES books(id) ON DELETE CASCADE,
    UNIQUE(user_id, book_id)
);

-- Enable Row Level Security (RLS)
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Policies for books (public read)
CREATE POLICY "Books are viewable by everyone" ON books FOR SELECT USING (true);

-- Policies for profiles
CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = id OR auth.email() = 'admin@gmail.com');
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id OR auth.email() = 'admin@gmail.com');
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Admins can manage any profile" ON profiles FOR DELETE USING (auth.uid() = id OR auth.email() = 'admin@gmail.com');

-- Policies for favorites
CREATE POLICY "Users can view their own favorites" ON favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own favorites" ON favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own favorites" ON favorites FOR DELETE USING (auth.uid() = user_id);

-- Insert sample books data
INSERT INTO books (id, title, author, img, rating, votes, category) VALUES
('book-1', 'Haunting Adeline', 'Hayley Dee Carlton', 'book.jpg', 4.7, 1250, 'bestseller'),
('book-2', 'Crescent City. House of Earth and Blood', 'Sarah J. Maas', 'book2.png', 4.5, 980, 'bestseller'),
('book-3', 'From Blood and Ash', 'Jennifer L. Armentrout', 'book3.png', 4.6, 1100, 'bestseller'),
('book-4', 'Gild', 'Raven Kennedy', 'book4.png', 4.4, 850, 'bestseller'),
('book-5', 'A Touch of Darkness', 'Scarlett St. Clair', 'book5.png', 4.8, 1300, 'bestseller'),
('book-6', 'Buttons&Lace', 'Penelope Sky', 'book6.png', 4.3, 750, 'bestseller'),
('book-7', 'Kingdom of the Wicked', 'Kerri Maniscalco', 'book7.jpeg', 4.6, 1000, 'bestseller'),
('book-8', 'Fourth Wing', 'Rebecca Yarros', 'book8.png', 4.7, 1200, 'bestseller'),
('book-9', 'Shatter Me', 'Tahereh Mafi', 'book9.png', 4.5, 900, 'bestseller'),
('book-10', 'A Good Girl''s Guide to Murder', 'Holly Jackson', 'book10.png', 4.6, 1100, 'bestseller'),
('book-11', 'The Surgeon', 'Tess Gerritsen', 'book11.jpg', 4.4, 800, 'bestseller'),
('book-12', 'My Dark Romeo', 'Parker S. Huntington, L.J.Shen', 'book12.png', 4.7, 1250, 'bestseller'),
('book-13', 'Five Survive', 'Holly Jackson', 'book13.png', 4.5, 950, 'bestseller'),
('book-14', 'Punk 57', 'Penelope Douglas', 'book14.png', 4.3, 700, 'bestseller'),
('book-15', 'If had been with me', 'Laura Nowlin', 'book15.png', 4.6, 1050, 'bestseller'),
('book-16', 'Murder on the Orient Express', 'Agatha Christie', 'book16.png', 4.8, 1350, 'bestseller'),
('book-17', 'Bound by Honor', 'Cora Reilly', 'book17.png', 4.5, 900, 'bestseller'),
('book-18', 'Gothikana', 'RuNyx', 'book18.png', 4.4, 800, 'bestseller'),
('book-19', 'The Chemistry of Death', 'Simon Beckett', 'book19.png', 4.3, 700, 'bestseller'),
('book-20', 'Pet Sematary', 'Stephen King', 'book20.jpg', 4.6, 1100, 'bestseller'),
('novelty-1', 'New Book 1', 'Author 1', 'img1.jpg', 0, 0, 'novelty'),
('novelty-2', 'New Book 2', 'Author 2', 'img2.jpg', 0, 0, 'novelty'),
('fiction-1', 'Fiction Book 1', 'Author A', 'book1.jpg', 4.5, 500, 'fiction'),
('announcements-1', 'Announcement 1', 'Author B', 'book2.jpg', 4.2, 300, 'announcements'),
('educational-1', 'Educational 1', 'Author C', 'book3.jpg', 4.8, 800, 'educational'),
('other-1', 'Other 1', 'Author D', 'book4.jpg', 4.0, 200, 'other');
