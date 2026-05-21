CREATE TABLE books (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    img TEXT,
    rating REAL DEFAULT 0,
    votes INTEGER DEFAULT 0,
    price REAL DEFAULT 0,
    category TEXT DEFAULT 'other'
);

CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    name TEXT,
    username TEXT,
    email TEXT UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    book_id TEXT REFERENCES books(id) ON DELETE CASCADE,
    UNIQUE(user_id, book_id)
);

ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW();

CREATE POLICY "Books are viewable by everyone" ON books FOR SELECT USING (true);

CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = id OR auth.email() = 'admin@gmail.com');
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id OR auth.email() = 'admin@gmail.com');
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Admins can manage any profile" ON profiles FOR DELETE USING (auth.uid() = id OR auth.email() = 'admin@gmail.com');

CREATE POLICY "Users can view their own favorites" ON favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own favorites" ON favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own favorites" ON favorites FOR DELETE USING (auth.uid() = user_id);

INSERT INTO books (id, title, author, img, rating, votes, category) VALUES
('book-1', 'Haunting Adeline', 'Hayley Dee Carlton', 'images/book1.jpg', 4.7, 1250, 'bestseller'),
('book-2', 'Crescent City. House of Earth and Blood', 'Sarah J. Maas', 'images/book2.png', 4.5, 980, 'bestseller'),
('book-3', 'From Blood and Ash', 'Jennifer L. Armentrout', 'images/book3.png', 4.6, 1100, 'bestseller'),
('book-4', 'Gild', 'Raven Kennedy', 'images/book4.png', 4.4, 850, 'bestseller'),
('book-5', 'A Touch of Darkness', 'Scarlett St. Clair', 'images/book5.png', 4.8, 1300, 'bestseller'),
('book-6', 'Buttons&Lace', 'Penelope Sky', 'images/book6.png', 4.3, 750, 'bestseller'),
('book-7', 'Kingdom of the Wicked', 'Kerri Maniscalco', 'images/book7.jpeg', 4.6, 1000, 'bestseller'),
('book-8', 'Fourth Wing', 'Rebecca Yarros', 'images/book8.png', 4.7, 1200, 'bestseller'),
('book-9', 'Shatter Me', 'Tahereh Mafi', 'images/book9.png', 4.5, 900, 'bestseller'),
('book-10', 'A Good Girl''s Guide to Murder', 'Holly Jackson', 'images/book10.png', 4.6, 1100, 'bestseller'),
('book-11', 'The Surgeon', 'Tess Gerritsen', 'images/book11.jpg', 4.4, 800, 'bestseller'),
('book-12', 'My Dark Romeo', 'Parker S. Huntington, L.J.Shen', 'images/book12.png', 4.7, 1250, 'bestseller'),
('book-13', 'Five Survive', 'Holly Jackson', 'images/book13.png', 4.5, 950, 'bestseller'),
('book-14', 'Punk 57', 'Penelope Douglas', 'images/book14.png', 4.3, 700, 'bestseller'),
('book-15', 'If had been with me', 'Laura Nowlin', 'images/book15.png', 4.6, 1050, 'bestseller'),
('book-16', 'Murder on the Orient Express', 'Agatha Christie', 'images/book16.png', 4.8, 1350, 'bestseller'),
('book-17', 'Bound by Honor', 'Cora Reilly', 'images/book17.png', 4.5, 900, 'bestseller'),
('book-18', 'Gothikana', 'RuNyx', 'images/book18.png', 4.4, 800, 'bestseller'),
('book-19', 'The Chemistry of Death', 'Simon Beckett', 'images/book19.png', 4.3, 700, 'bestseller'),
('book-20', 'Pet Sematary', 'Stephen King', 'images/book20.jpg', 4.6, 1100, 'bestseller'),
('novelty-1', 'Starside', 'Alex Aster', 'images/novelty1.jpg', 0, 0, 'novelty'),
('novelty-2', 'Forbidden Alchemy', 'Stacey McEwan', 'images/novelty2.jpg', 0, 0, 'novelty'),
('novelty-3', 'A Forsaken Prophecy', 'Stacey McEwan', 'images/novelty3.jpg', 0, 0, 'novelty'),
('novelty-4', 'Daggermouth', 'H.M.Wolfe', 'images/novelty4.webp', 0, 0, 'novelty'),
('novelty-5', 'With Hearts of Flame', 'Briar Boleyn', 'images/novelty5.jpg', 0, 0, 'novelty'),
('novelty-6', 'Dire Bound', 'Sable Sorensen', 'images/novelty6.jpg', 0, 0, 'novelty'),
('novelty-7', 'Eldritch', 'Keri Lake', 'images/novelty7.webp', 0, 0, 'novelty'),
('novelty-8', 'Vine of Hearts', 'Julie Soto', 'images/novelty8.webp', 0, 0, 'novelty'),
('novelty-9', 'Cursed City', 'Kate Golden', 'images/novelty9.jpg', 0, 0, 'novelty'),
('novelty-10', 'The Wrath Gods Reap', 'Abigall Owen', 'images/novelty10.jpg', 0, 0, 'novelty'),
('fiction-1', 'Kirill', 'Lilian Harris', 'images/fiction1.jpg', 4.5, 500, 'fiction'),
('fiction-2', 'Fury Bound', 'Sable Sorensen', 'images/fiction2.webp', 4.3, 400, 'fiction'),
('fiction-3', 'My Dreadeul Darling', 'H.D.Carlton', 'images/fiction3.jpg', 4.4, 450, 'fiction'),
('fiction-4', 'Between Tides&Thunder', 'Leena Kazak', 'images/fiction4.jpg', 4.2, 350, 'fiction'),
('fiction-5', 'Black House', 'Stephen King and Peter Straub', 'images/fiction5.jpg', 4.6, 550, 'fiction'),
('fiction-6', 'If Walls Could Talk', 'Jean Grainger', 'images/fiction6.jpg', 4.1, 300, 'fiction'),
('fiction-7', 'The Last House on Needless Street', 'Catriona Ward', 'images/fiction7.jpg', 4.4, 400, 'fiction'),
('fiction-8', 'Possessive Enemy', 'Michelle Heard', 'images/fiction8.jpg', 4.3, 350, 'fiction'),
('fiction-9',  'The Dinner Party', 'Freida mcFadden', 'images/fiction9.webp', 4.1, 300, 'fiction'),
('fiction-10', 'Mistborn', 'Brandon Sanderson', 'images/fiction10.jpg', 4.4, 400, 'fiction'),
('mystery-thriller-1', 'Boardroom Mask', 'Nicole Fox', 'images/mystery-thriller1.jpg', 4.2, 300, 'mystery-thriller'),
('mystery-thriller-2', 'You Can Tell Me', 'Melinda Leigh', 'images/mystery-thriller2.jpg', 4.3, 350, 'mystery-thriller'),
('mystery-thriller-3', 'The Final System', 'Anthony Tardiff', 'images/mystery-thriller3.jpg', 4.4, 400, 'mystery-thriller'),
('mystery-thriller-4', 'The Missing One', 'A.R.Torre', 'images/mystery-thriller4.webp', 4.1, 250, 'mystery-thriller'),
('mystery-thriller-5', 'The Final Target', 'Nora Roberts', 'images/mystery-thriller5.webp', 4.5, 450, 'mystery-thriller'),
('mystery-thriller-6', 'The Keeper', 'Tana French', 'images/mystery-thriller6.webp', 4.0, 200, 'mystery-thriller'),
('mystery-thriller-7', 'Origin', 'Dan Brown', 'images/mystery-thriller7.webp', 4.3, 350, 'mystery-thriller'),
('mystery-thriller-8', 'God of War', 'Rina Kent', 'images/mystery-thriller8.webp', 4.2, 300, 'mystery-thriller'),
('mystery-thriller-9', 'Heart of my Monster', 'Rina Kent', 'images/mystery-thriller9.jpg', 4.1, 250, 'mystery-thriller'),
('mystery-thriller-10', 'Throne of Power', 'Rina Kent', 'images/mystery-thriller10.jpg', 4.4, 400, 'mystery-thriller'),
('romance-1', 'Rites of the Starling', 'Devney Perry', 'images/romance1.jpg', 4.5, 500, 'romance'),
('romance-2', 'Crown Me Yours', 'Liv Zander', 'images/romance2.webp', 4.3, 400, 'romance'),
('romance-3', 'Inked in Betrayal', 'Victoria Paige', 'images/romance3.jpg', 4.4, 450, 'romance'),
('romance-4', 'Trauma Bonded', 'Jaymin Eve & Tate James', 'images/romance4.webp', 4.2, 350, 'romance'),
('romance-5', 'Beautiful Graves', 'L.J.Shen', 'images/romance5.webp', 4.6, 550, 'romance'),
('romance-6', 'Law Maker', 'Susie Tate', 'images/romance6.webp', 4.1, 300, 'romance'),
('romance-7', 'Wicked Sanctuary', 'Jane Henry', 'images/romance7.webp', 4.0, 250, 'romance'),
('romance-8', 'Love in the Afternoon', 'Lisa Kleypas', 'images/romance8.webp', 4.3, 350, 'romance'),
('romance-9', 'Variation', 'Rebecca Yarros', 'images/romance9.webp', 4.1, 300, 'romance'),
('romance-10', 'Keeping 13', 'Chloe Walsh', 'images/romance10.webp', 4.4, 400, 'romance'),
('fantasy-1', 'Fated of the Wolf Maiden', 'April l.Moon', 'images/fantasy1.webp', 4.0, 200, 'fantasy'),
('fantasy-2', 'King of Gluttony', 'Ana Huang', 'images/fantasy2.webp', 4.3, 350, 'fantasy'),
('fantasy-3', 'The Nightmare in HIM', 'Suzanne Wright', 'images/fantasy3.jpg', 4.4, 400, 'fantasy'),
('fantasy-4', 'While the Dark Remains', 'Joanna Ruth Meyer', 'images/fantasy4.webp', 4.2, 300, 'fantasy'),
('fantasy-5', 'The People''s Library', 'Veronica G.Henry', 'images/fantasy5.webp', 4.6, 550, 'fantasy'),
('fantasy-6', 'The Shattered King', 'Charlie N.Holmberg', 'images/fantasy6.webp', 4.1, 300, 'fantasy'),
('fantasy-7', 'Rune Breaker', 'Mila Finch', 'images/fantasy7.webp', 4.0, 250, 'fantasy'),
('fantasy-8', 'Wild Scottish Magic', 'Tricia O''Malley', 'images/fantasy8.webp', 4.3, 350, 'fantasy');
