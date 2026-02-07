# Romance App - Couple Understanding System

## 🎯 Core Purpose

**Romance is NOT a dating app.** It's a **couple understanding and growth platform** for:

- 💍 Married couples
- 💕 Engaged couples
- 🤝 Serious relationships (before marriage)

The goal: **Play quizzes together to understand each other better.**

---

## 🏗️ Architecture Overview

### **Three Main Features:**

#### **1. Profiles / Find Partner** (`/profiles`)

- Users create profiles with bio, interests, what they're looking for
- **Purpose**: Find your spouse/partner on the app so you can collaborate
- **NOT for chatting, NOT for dating** - strictly for finding someone to quiz with
- Search by name → See profile → Click "Start Quiz" together

#### **2. Collaborate / Quiz Rooms** (`/collaborate`)

- User A: Creates a room → Gets code → Shares via WhatsApp/text
- User B: Joins room with code
- **Together**: Select a quiz → Both answer → See how compatible you are
- **Why rooms?**: Simple, no complex database tracking. External messaging keeps it light.

#### **3. Quiz** (`/quiz`)

- Individual quizzes to learn about yourself
- Questions designed for couples understanding
- Later: Integrate with Collaborate for duo quizzes

---

## 🔄 User Flow

```
1. SIGNUP/LOGIN
   └─> User creates account

2. FIND PARTNER (if not married yet)
   └─> Fill profile (bio, interests, "looking for: Marriage")
   └─> Navigate to "Find Partner"
   └─> Search for partner by name
   └─> View their profile
   └─> Click "Start Quiz" button (setup future)

3. COLLABORATE / PLAY QUIZZES
   └─> Go to "Collaborate"
   └─> User A: Creates room → Gets code ABC123
   └─> User A: Shares code via WhatsApp/SMS (external)
   └─> User B: Enters code ABC123 → Joins same room
   └─> Both: Select "Couple Compatibility Quiz"
   └─> Both: Answer 10 questions
   └─> System: Compare answers → Show results
   └─>        "You matched on 7/10 questions!"

4. RESULTS & LEARNING
   └─> See where you agree/disagree
   └─> Understand each other better
   └─> Come back weekly for more quizzes
```

---

## 💾 Database Models

### **User**

```javascript
{
  name, email, password,           // Auth
  bio, profilePic, interests,       // Profile display
  lookingFor: "Marriage|Dating|..."  // Couple status
  createdAt                         // Join date
}
```

**Why these fields?**

- Minimal but enough for couples to find & recognize each other
- "lookingFor" helps match people in similar life stages
- No sensitive relationship data stored

### **Room**

```javascript
{
  roomCode: "ABC123",              // Shared code
  createdBy: userId,               // User A
  participants: [                  // User A + User B
    { userId, name, joinedAt }
  ],
  status: "waiting|playing|completed",
  currentQuiz: "quiz_id",          // Active quiz
  quizAnswers: [                   // Track responses
    { userId, answers: [{ questionId, answer, timestamp }] }
  ],
  expiresAt: Date                  // Auto-delete after 24h
}
```

**Why this design?**

- `roomCode` is shareable (6 chars, easy to say "ABC-123")
- `participants` keeps both people tracked
- `quizAnswers` stores answers for comparison **without storing chat**
- `expiresAt` prevents database bloat - temporary rooms

---

## 🔐 Security & Privacy

✅ **Auth Middleware** - All endpoints require JWT token  
✅ **Public Profile Fields Only** - No email/password exposed  
✅ **Room Limit** - Max 2 people (couples only)  
✅ **No Chat / Messaging** - Partners use external apps (WhatsApp, SMS)  
✅ **TTL Index** - Rooms auto-delete after 24 hours  
✅ **Search Only on Verified** - Only show users who verified email

---

## 🛠️ Backend API Endpoints

### **Auth (Authentication)**

```
POST   /api/auth/register           - Create account
POST   /api/auth/login              - Login
GET    /api/auth/verify-email       - Confirm email
GET    /api/auth/search?q=name      - Find users (for profiles)
GET    /api/auth/profile/:userId    - View user's public profile
```

### **Rooms (Collaboration)**

```
POST   /api/rooms/create            - Create quiz room
POST   /api/rooms/join              - Join with code
GET    /api/rooms/:roomId           - Get room details
PUT    /api/rooms/:roomId/status    - Update room state
POST   /api/rooms/:roomId/answers   - Submit quiz answers
POST   /api/rooms/:roomId/leave     - Leave room
```

---

## 🎨 Frontend Flow

### **Pages**

- **Login** → Email + password
- **Dashboard** → Welcome, stats
- **Find Partner** → Search & view profiles
- **Profile** → Detailed view of one person
- **Collaborate** → Create/join rooms & play quizzes
- **Quiz** → Solo quiz questions
- **Settings** → Account management

### **Why the current navigation?**

```
Sidebar Navigation:
├─ Dashboard        (home, see stats)
├─ Quiz            (solo quizzes)
├─ My Journey      (progress tracking)
├─ Find Partner    (discover your spouse)
├─ Community       (future: discussion)
├─ Collaborate     (quiz together)
└─ Settings        (account)
```

---

## 🚀 How Everything Connects

```
PROFILE SYSTEM:
User A profile → User B finds it → Clicks "Start Quiz"

ROOM SYSTEM:
Room created → Code generated → Code shared externally
             → Partner joins → Play together → Compare results

QUIZ SYSTEM:
Questions designed for couples → Track answers → Show compatibility
```

**Key insight**: The app itself handles quizzes & rooms.
External apps (WhatsApp/SMS) handle discovery messaging.
This keeps the app lightweight and focused on ONE thing: **Understanding your partner.** ✨

---

## 📝 Example Scenario

```
2025-02-06:
- Alice signs up, fills profile (bio: "Love hiking")
- Bob signs up, fills profile (bio: "Software engineer")
- Both search for each other → Click "Add as Partner"  (future)

- Alice clicks "Collaborate"
- Alice creates room → Gets code "XY9Z2K"
- Alice sends WhatsApp: "Let's do the romance quiz! Code: XY9Z2K"
- Bob opens app → "Collaborate" → "Join Room"
- Bob enters "XY9Z2K" → Both now in same room

- Alice clicks "Couple Compatibility Quiz"
- Both see Q1: "What's your partner's biggest strength?"
- Alice answers: "Kindness"
- Bob answers: "Kindness"
- Both answer all 10 questions

- App shows: "Alice & Bob: 7/10 Match!"
- Shows exact questions where they aligned/differed
- They talk about the differences (maybe via default message apps)
```

---

## 🔮 Future Enhancements

- [ ] Real-time quiz sync (WebSocket)
- [ ] Weekly couple challenges
- [ ] Calendar for date ideas
- [ ] Progress analytics
- [ ] Custom couple goals
- [ ] Integration with calendar apps
- [ ] Video message questions
- [ ] Integrate messaging WITHIN the app (future)

---

## 📚 Code Organization

```
backend/
├─ models/
│  ├─ user.js          (profile + auth)
│  ├─ room.js          (quiz rooms)
│  └─ quiz.js          (future)
├─ controllers/
│  ├─ authControllers.js    (signup, login, search)
│  ├─ roomControllers.js    (create/join/answer)
│  └─ quizControllers.js    (future)
├─ routes/
│  ├─ authRoutes.js
│  ├─ roomRoutes.js
│  └─ quizRoutes.js
└─ middleware/
   └─ authMiddleware.js  (JWT verification)

frontend/
├─ pages/
│  ├─ Login.jsx
│  ├─ Dashboard.jsx
│  ├─ Profiles.jsx       (find partner)
│  ├─ Profile.jsx        (view partner)
│  ├─ Collaborate.jsx    (play together)
│  └─ Quiz.jsx           (solo learning)
├─ components/
│  ├─ Sidebar.jsx
│  └─ ...
└─ contexts/
   └─ UserContext.jsx    (store logged-in user)
```

---

## 💡 Design Philosophy

**Keep it simple. Keep it couple-focused.**

- No chat = No toxicity
- No likes/swipes = No gamification of relationships
- No algorithm = Direct connection (by code share)
- Code-based joining = No friend requests database bloat
- Temporary rooms = No stale data

The app is a **tool for understanding**, not a **social network**.

---

## ❓ FAQ

**Q: Why not integrate messaging?**
A: Partners already have WhatsApp, text, etc. Simpler, faster, no duplicating features.

**Q: Can strangers find each other?**
A: Yes, but the "Find Partner" page is for people in relationships to find their spouse. The "lookingFor" field helps filter (Marriage vs Dating vs Friendship).

**Q: What prevents abuse?**
A: Email verification + Code-based rooms (only 2 people) + No messaging in-app.

**Q: Is this a dating app?**
A: No. It's for **married/engaged couples**. While singles can technically join, the purpose is for partners to quiz together.

---

## 🎓 Learning Resources

Each function has extensive comments explaining:

- **WHY** it exists
- **HOW** it works
- **WHAT** it validates
- **EXAMPLE** usage

Check:

- `backend/models/room.js` - Room schema with full docs
- `backend/controllers/roomControllers.js` - Function explanations
- `frontend/src/pages/Collaborate.jsx` - UI flow with comments
