import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import React from "react";

const itemData = [
  {
    id: 1,
    rows: 2,
    cols: 2,
    caption: "scenes",
    mediaFiles: [
      "http://res.cloudinary.com/dumfcak5b/image/upload/v1736234267/buzzerUploads/tfyv4hizg0yydgwooxyz.png",
    ],
    user: {
      id: 2,
      firstName: "mave",
      lastName: "med",
      userName: null,
      email: "mave@mail.com",
      phone: "9891981132",
      password: "$2a$10$O6Q8kHiT.X55Rwcq4EiQYewFo28SBK3yuj51O3HF6NeKEgsY40olq",
      profileImg:
        "https://th.bing.com/th/id/OIP.tZq4FbHI-2VuBSGkHjfyfAHaHa?w=209&h=209&c=7&r=0&o=5&dpr=1.5&pid=1.7",
      followers: [1, 4, 6],
      followings: [1, 4],
      gender: "MALE",
    },
    tags: ["scene", "fun", "imaeg"],
    location: "uk",
    usersTagged: [],
    likedBy: [
      {
        id: 6,
        firstName: "Davendra",
        lastName: "bedwal",
        userName: null,
        email: "zyzz@mail.com",
        phone: "9891981132",
        password:
          "$2a$10$Z6nGNGToUJ.KnTOXFp5f9.xaLnGR0YSlkPCuAZWG07vfc6SSfrEX6",
        profileImg:
          "http://res.cloudinary.com/dumfcak5b/image/upload/v1736102589/buzzerUploads/gw0jd0ofugayxvseysau.jpg",
        followers: [4, 2],
        followings: [3, 2, 4],
        gender: "MALE",
      },
      {
        id: 4,
        firstName: "Dave",
        lastName: "Mexe",
        userName: null,
        email: "dave123@mail.com",
        phone: "9876543210",
        password:
          "$2a$10$JWc9R4WD/44.LTMHl4OfcOxLY/Q/ZvjOATdwhUvTaUjf6Fz4TkieW",
        profileImg:
          "https://th.bing.com/th/id/OIP.V33VQxg_ASEriHC2Cf0ktAHaHI?rs=1&pid=ImgDetMain",
        followers: [2, 6, 7],
        followings: [6, 1, 3, 2],
        gender: "MALE",
      },
      {
        id: 2,
        firstName: "mave",
        lastName: "med",
        userName: null,
        email: "mave@mail.com",
        phone: "9891981132",
        password:
          "$2a$10$O6Q8kHiT.X55Rwcq4EiQYewFo28SBK3yuj51O3HF6NeKEgsY40olq",
        profileImg:
          "https://th.bing.com/th/id/OIP.tZq4FbHI-2VuBSGkHjfyfAHaHa?w=209&h=209&c=7&r=0&o=5&dpr=1.5&pid=1.7",
        followers: [1, 4, 6],
        followings: [1, 4],
        gender: "MALE",
      },
    ],
    comments: [
      {
        id: 1,
        content: "awesome",
        commentedBy: {
          id: 6,
          firstName: "Davendra",
          lastName: "bedwal",
          userName: null,
          email: "zyzz@mail.com",
          phone: "9891981132",
          password:
            "$2a$10$Z6nGNGToUJ.KnTOXFp5f9.xaLnGR0YSlkPCuAZWG07vfc6SSfrEX6",
          profileImg:
            "http://res.cloudinary.com/dumfcak5b/image/upload/v1736102589/buzzerUploads/gw0jd0ofugayxvseysau.jpg",
          followers: [4, 2],
          followings: [3, 2, 4],
          gender: "MALE",
        },
        likedBy: [],
        createdAt: null,
        updatedAt: "2025-01-07T13:40:50.703719",
      },
      {
        id: 4,
        content: "wow",
        commentedBy: {
          id: 6,
          firstName: "Davendra",
          lastName: "bedwal",
          userName: null,
          email: "zyzz@mail.com",
          phone: "9891981132",
          password:
            "$2a$10$Z6nGNGToUJ.KnTOXFp5f9.xaLnGR0YSlkPCuAZWG07vfc6SSfrEX6",
          profileImg:
            "http://res.cloudinary.com/dumfcak5b/image/upload/v1736102589/buzzerUploads/gw0jd0ofugayxvseysau.jpg",
          followers: [4, 2],
          followings: [3, 2, 4],
          gender: "MALE",
        },
        likedBy: [
          {
            id: 2,
            firstName: "mave",
            lastName: "med",
            userName: null,
            email: "mave@mail.com",
            phone: "9891981132",
            password:
              "$2a$10$O6Q8kHiT.X55Rwcq4EiQYewFo28SBK3yuj51O3HF6NeKEgsY40olq",
            profileImg:
              "https://th.bing.com/th/id/OIP.tZq4FbHI-2VuBSGkHjfyfAHaHa?w=209&h=209&c=7&r=0&o=5&dpr=1.5&pid=1.7",
            followers: [1, 4, 6],
            followings: [1, 4],
            gender: "MALE",
          },
        ],
        createdAt: "2025-01-07T13:49:18.531223",
        updatedAt: "2025-01-07T13:49:18.531223",
      },
      {
        id: 5,
        content:
          "andstand part(2) . . . . . . . . . #handstand #balance #control #fitnesstips #workoutanywhere #calesthenicsworkout #handstandpractice #adaptation #bodyweightworkout",
        commentedBy: {
          id: 6,
          firstName: "Davendra",
          lastName: "bedwal",
          userName: null,
          email: "zyzz@mail.com",
          phone: "9891981132",
          password:
            "$2a$10$Z6nGNGToUJ.KnTOXFp5f9.xaLnGR0YSlkPCuAZWG07vfc6SSfrEX6",
          profileImg:
            "http://res.cloudinary.com/dumfcak5b/image/upload/v1736102589/buzzerUploads/gw0jd0ofugayxvseysau.jpg",
          followers: [4, 2],
          followings: [3, 2, 4],
          gender: "MALE",
        },
        likedBy: [
          {
            id: 2,
            firstName: "mave",
            lastName: "med",
            userName: null,
            email: "mave@mail.com",
            phone: "9891981132",
            password:
              "$2a$10$O6Q8kHiT.X55Rwcq4EiQYewFo28SBK3yuj51O3HF6NeKEgsY40olq",
            profileImg:
              "https://th.bing.com/th/id/OIP.tZq4FbHI-2VuBSGkHjfyfAHaHa?w=209&h=209&c=7&r=0&o=5&dpr=1.5&pid=1.7",
            followers: [1, 4, 6],
            followings: [1, 4],
            gender: "MALE",
          },
        ],
        createdAt: "2025-01-07T14:00:20.995856",
        updatedAt: "2025-01-07T14:00:20.995856",
      },
      {
        id: 6,
        content: "okkkm",
        commentedBy: {
          id: 4,
          firstName: "Dave",
          lastName: "Mexe",
          userName: null,
          email: "dave123@mail.com",
          phone: "9876543210",
          password:
            "$2a$10$JWc9R4WD/44.LTMHl4OfcOxLY/Q/ZvjOATdwhUvTaUjf6Fz4TkieW",
          profileImg:
            "https://th.bing.com/th/id/OIP.V33VQxg_ASEriHC2Cf0ktAHaHI?rs=1&pid=ImgDetMain",
          followers: [2, 6, 7],
          followings: [6, 1, 3, 2],
          gender: "MALE",
        },
        likedBy: [
          {
            id: 2,
            firstName: "mave",
            lastName: "med",
            userName: null,
            email: "mave@mail.com",
            phone: "9891981132",
            password:
              "$2a$10$O6Q8kHiT.X55Rwcq4EiQYewFo28SBK3yuj51O3HF6NeKEgsY40olq",
            profileImg:
              "https://th.bing.com/th/id/OIP.tZq4FbHI-2VuBSGkHjfyfAHaHa?w=209&h=209&c=7&r=0&o=5&dpr=1.5&pid=1.7",
            followers: [1, 4, 6],
            followings: [1, 4],
            gender: "MALE",
          },
        ],
        createdAt: "2025-01-07T14:20:18.225562",
        updatedAt: "2025-01-07T14:20:18.225562",
      },
      {
        id: 7,
        content: "pk",
        commentedBy: {
          id: 4,
          firstName: "Dave",
          lastName: "Mexe",
          userName: null,
          email: "dave123@mail.com",
          phone: "9876543210",
          password:
            "$2a$10$JWc9R4WD/44.LTMHl4OfcOxLY/Q/ZvjOATdwhUvTaUjf6Fz4TkieW",
          profileImg:
            "https://th.bing.com/th/id/OIP.V33VQxg_ASEriHC2Cf0ktAHaHI?rs=1&pid=ImgDetMain",
          followers: [2, 6, 7],
          followings: [6, 1, 3, 2],
          gender: "MALE",
        },
        likedBy: [
          {
            id: 2,
            firstName: "mave",
            lastName: "med",
            userName: null,
            email: "mave@mail.com",
            phone: "9891981132",
            password:
              "$2a$10$O6Q8kHiT.X55Rwcq4EiQYewFo28SBK3yuj51O3HF6NeKEgsY40olq",
            profileImg:
              "https://th.bing.com/th/id/OIP.tZq4FbHI-2VuBSGkHjfyfAHaHa?w=209&h=209&c=7&r=0&o=5&dpr=1.5&pid=1.7",
            followers: [1, 4, 6],
            followings: [1, 4],
            gender: "MALE",
          },
        ],
        createdAt: "2025-01-07T14:20:37.094114",
        updatedAt: "2025-01-07T14:20:37.094114",
      },
      {
        id: 8,
        content: "amazing",
        commentedBy: {
          id: 4,
          firstName: "Dave",
          lastName: "Mexe",
          userName: null,
          email: "dave123@mail.com",
          phone: "9876543210",
          password:
            "$2a$10$JWc9R4WD/44.LTMHl4OfcOxLY/Q/ZvjOATdwhUvTaUjf6Fz4TkieW",
          profileImg:
            "https://th.bing.com/th/id/OIP.V33VQxg_ASEriHC2Cf0ktAHaHI?rs=1&pid=ImgDetMain",
          followers: [2, 6, 7],
          followings: [6, 1, 3, 2],
          gender: "MALE",
        },
        likedBy: [],
        createdAt: "2025-01-07T15:12:20.723479",
        updatedAt: "2025-01-07T15:12:20.723479",
      },
      {
        id: 9,
        content: "beatufiul",
        commentedBy: {
          id: 4,
          firstName: "Dave",
          lastName: "Mexe",
          userName: null,
          email: "dave123@mail.com",
          phone: "9876543210",
          password:
            "$2a$10$JWc9R4WD/44.LTMHl4OfcOxLY/Q/ZvjOATdwhUvTaUjf6Fz4TkieW",
          profileImg:
            "https://th.bing.com/th/id/OIP.V33VQxg_ASEriHC2Cf0ktAHaHI?rs=1&pid=ImgDetMain",
          followers: [2, 6, 7],
          followings: [6, 1, 3, 2],
          gender: "MALE",
        },
        likedBy: [],
        createdAt: "2025-01-07T15:13:06.516372",
        updatedAt: "2025-01-07T15:13:06.516372",
      },
      {
        id: 10,
        content: "frick boi",
        commentedBy: {
          id: 4,
          firstName: "Dave",
          lastName: "Mexe",
          userName: null,
          email: "dave123@mail.com",
          phone: "9876543210",
          password:
            "$2a$10$JWc9R4WD/44.LTMHl4OfcOxLY/Q/ZvjOATdwhUvTaUjf6Fz4TkieW",
          profileImg:
            "https://th.bing.com/th/id/OIP.V33VQxg_ASEriHC2Cf0ktAHaHI?rs=1&pid=ImgDetMain",
          followers: [2, 6, 7],
          followings: [6, 1, 3, 2],
          gender: "MALE",
        },
        likedBy: [],
        createdAt: "2025-01-07T15:15:35.193802",
        updatedAt: "2025-01-07T15:15:35.193802",
      },
      {
        id: 11,
        content: "oi",
        commentedBy: {
          id: 4,
          firstName: "Dave",
          lastName: "Mexe",
          userName: null,
          email: "dave123@mail.com",
          phone: "9876543210",
          password:
            "$2a$10$JWc9R4WD/44.LTMHl4OfcOxLY/Q/ZvjOATdwhUvTaUjf6Fz4TkieW",
          profileImg:
            "https://th.bing.com/th/id/OIP.V33VQxg_ASEriHC2Cf0ktAHaHI?rs=1&pid=ImgDetMain",
          followers: [2, 6, 7],
          followings: [6, 1, 3, 2],
          gender: "MALE",
        },
        likedBy: [],
        createdAt: "2025-01-07T15:23:25.964098",
        updatedAt: "2025-01-07T15:23:25.964098",
      },
      {
        id: 12,
        content: "bruhh",
        commentedBy: {
          id: 4,
          firstName: "Dave",
          lastName: "Mexe",
          userName: null,
          email: "dave123@mail.com",
          phone: "9876543210",
          password:
            "$2a$10$JWc9R4WD/44.LTMHl4OfcOxLY/Q/ZvjOATdwhUvTaUjf6Fz4TkieW",
          profileImg:
            "https://th.bing.com/th/id/OIP.V33VQxg_ASEriHC2Cf0ktAHaHI?rs=1&pid=ImgDetMain",
          followers: [2, 6, 7],
          followings: [6, 1, 3, 2],
          gender: "MALE",
        },
        likedBy: [],
        createdAt: "2025-01-07T15:25:02.192338",
        updatedAt: "2025-01-07T15:25:02.192338",
      },
      {
        id: 13,
        content: "i know ",
        commentedBy: {
          id: 4,
          firstName: "Dave",
          lastName: "Mexe",
          userName: null,
          email: "dave123@mail.com",
          phone: "9876543210",
          password:
            "$2a$10$JWc9R4WD/44.LTMHl4OfcOxLY/Q/ZvjOATdwhUvTaUjf6Fz4TkieW",
          profileImg:
            "https://th.bing.com/th/id/OIP.V33VQxg_ASEriHC2Cf0ktAHaHI?rs=1&pid=ImgDetMain",
          followers: [2, 6, 7],
          followings: [6, 1, 3, 2],
          gender: "MALE",
        },
        likedBy: [],
        createdAt: "2025-01-07T15:26:45.691659",
        updatedAt: "2025-01-07T15:26:45.691659",
      },
      {
        id: 14,
        content: "got it",
        commentedBy: {
          id: 4,
          firstName: "Dave",
          lastName: "Mexe",
          userName: null,
          email: "dave123@mail.com",
          phone: "9876543210",
          password:
            "$2a$10$JWc9R4WD/44.LTMHl4OfcOxLY/Q/ZvjOATdwhUvTaUjf6Fz4TkieW",
          profileImg:
            "https://th.bing.com/th/id/OIP.V33VQxg_ASEriHC2Cf0ktAHaHI?rs=1&pid=ImgDetMain",
          followers: [2, 6, 7],
          followings: [6, 1, 3, 2],
          gender: "MALE",
        },
        likedBy: [],
        createdAt: "2025-01-07T15:31:25.206762",
        updatedAt: "2025-01-07T15:31:25.206762",
      },
      {
        id: 15,
        content: "awesome",
        commentedBy: {
          id: 4,
          firstName: "Dave",
          lastName: "Mexe",
          userName: null,
          email: "dave123@mail.com",
          phone: "9876543210",
          password:
            "$2a$10$JWc9R4WD/44.LTMHl4OfcOxLY/Q/ZvjOATdwhUvTaUjf6Fz4TkieW",
          profileImg:
            "https://th.bing.com/th/id/OIP.V33VQxg_ASEriHC2Cf0ktAHaHI?rs=1&pid=ImgDetMain",
          followers: [2, 6, 7],
          followings: [6, 1, 3, 2],
          gender: "MALE",
        },
        likedBy: [],
        createdAt: "2025-01-07T15:31:34.542794",
        updatedAt: "2025-01-07T15:31:34.542794",
      },
      {
        id: 16,
        content: "so many comments, love this,",
        commentedBy: {
          id: 6,
          firstName: "Davendra",
          lastName: "bedwal",
          userName: null,
          email: "zyzz@mail.com",
          phone: "9891981132",
          password:
            "$2a$10$Z6nGNGToUJ.KnTOXFp5f9.xaLnGR0YSlkPCuAZWG07vfc6SSfrEX6",
          profileImg:
            "http://res.cloudinary.com/dumfcak5b/image/upload/v1736102589/buzzerUploads/gw0jd0ofugayxvseysau.jpg",
          followers: [4, 2],
          followings: [3, 2, 4],
          gender: "MALE",
        },
        likedBy: [],
        createdAt: "2025-01-07T15:39:41.829977",
        updatedAt: "2025-01-07T15:39:41.829977",
      },
      {
        id: 19,
        content: "sighs!!",
        commentedBy: {
          id: 2,
          firstName: "mave",
          lastName: "med",
          userName: null,
          email: "mave@mail.com",
          phone: "9891981132",
          password:
            "$2a$10$O6Q8kHiT.X55Rwcq4EiQYewFo28SBK3yuj51O3HF6NeKEgsY40olq",
          profileImg:
            "https://th.bing.com/th/id/OIP.tZq4FbHI-2VuBSGkHjfyfAHaHa?w=209&h=209&c=7&r=0&o=5&dpr=1.5&pid=1.7",
          followers: [1, 4, 6],
          followings: [1, 4],
          gender: "MALE",
        },
        likedBy: [],
        createdAt: "2025-01-12T22:06:41.81424",
        updatedAt: "2025-01-12T22:06:41.81424",
      },
      {
        id: 20,
        content: "lovely",
        commentedBy: {
          id: 2,
          firstName: "mave",
          lastName: "med",
          userName: null,
          email: "mave@mail.com",
          phone: "9891981132",
          password:
            "$2a$10$O6Q8kHiT.X55Rwcq4EiQYewFo28SBK3yuj51O3HF6NeKEgsY40olq",
          profileImg:
            "https://th.bing.com/th/id/OIP.tZq4FbHI-2VuBSGkHjfyfAHaHa?w=209&h=209&c=7&r=0&o=5&dpr=1.5&pid=1.7",
          followers: [1, 4, 6],
          followings: [1, 4],
          gender: "MALE",
        },
        likedBy: [
          {
            id: 2,
            firstName: "mave",
            lastName: "med",
            userName: null,
            email: "mave@mail.com",
            phone: "9891981132",
            password:
              "$2a$10$O6Q8kHiT.X55Rwcq4EiQYewFo28SBK3yuj51O3HF6NeKEgsY40olq",
            profileImg:
              "https://th.bing.com/th/id/OIP.tZq4FbHI-2VuBSGkHjfyfAHaHa?w=209&h=209&c=7&r=0&o=5&dpr=1.5&pid=1.7",
            followers: [1, 4, 6],
            followings: [1, 4],
            gender: "MALE",
          },
        ],
        createdAt: "2025-01-15T22:32:32.990948",
        updatedAt: "2025-01-15T22:32:32.990948",
      },
    ],
    savedBy: [
      {
        id: 6,
        firstName: "Davendra",
        lastName: "bedwal",
        userName: null,
        email: "zyzz@mail.com",
        phone: "9891981132",
        password:
          "$2a$10$Z6nGNGToUJ.KnTOXFp5f9.xaLnGR0YSlkPCuAZWG07vfc6SSfrEX6",
        profileImg:
          "http://res.cloudinary.com/dumfcak5b/image/upload/v1736102589/buzzerUploads/gw0jd0ofugayxvseysau.jpg",
        followers: [4, 2],
        followings: [3, 2, 4],
        gender: "MALE",
      },
      {
        id: 4,
        firstName: "Dave",
        lastName: "Mexe",
        userName: null,
        email: "dave123@mail.com",
        phone: "9876543210",
        password:
          "$2a$10$JWc9R4WD/44.LTMHl4OfcOxLY/Q/ZvjOATdwhUvTaUjf6Fz4TkieW",
        profileImg:
          "https://th.bing.com/th/id/OIP.V33VQxg_ASEriHC2Cf0ktAHaHI?rs=1&pid=ImgDetMain",
        followers: [2, 6, 7],
        followings: [6, 1, 3, 2],
        gender: "MALE",
      },
      {
        id: 2,
        firstName: "mave",
        lastName: "med",
        userName: null,
        email: "mave@mail.com",
        phone: "9891981132",
        password:
          "$2a$10$O6Q8kHiT.X55Rwcq4EiQYewFo28SBK3yuj51O3HF6NeKEgsY40olq",
        profileImg:
          "https://th.bing.com/th/id/OIP.tZq4FbHI-2VuBSGkHjfyfAHaHa?w=209&h=209&c=7&r=0&o=5&dpr=1.5&pid=1.7",
        followers: [1, 4, 6],
        followings: [1, 4],
        gender: "MALE",
      },
    ],
    createdAt: "2025-01-07T12:48:48.401134",
    updatedAt: "2025-01-07T12:48:48.401134",
  },
  {
    id: 2,
    caption: "pattern",
    mediaFiles: [
      "http://res.cloudinary.com/dumfcak5b/image/upload/v1736234316/buzzerUploads/aapdf0j2bde0q4do8jfi.png",
    ],
    user: {
      id: 2,
      firstName: "mave",
      lastName: "med",
      userName: null,
      email: "mave@mail.com",
      phone: "9891981132",
      password: "$2a$10$O6Q8kHiT.X55Rwcq4EiQYewFo28SBK3yuj51O3HF6NeKEgsY40olq",
      profileImg:
        "https://th.bing.com/th/id/OIP.tZq4FbHI-2VuBSGkHjfyfAHaHa?w=209&h=209&c=7&r=0&o=5&dpr=1.5&pid=1.7",
      followers: [1, 4, 6],
      followings: [1, 4],
      gender: "MALE",
    },
    tags: ["illusion", "stare"],
    location: "chile",
    usersTagged: [],
    likedBy: [
      {
        id: 4,
        firstName: "Dave",
        lastName: "Mexe",
        userName: null,
        email: "dave123@mail.com",
        phone: "9876543210",
        password:
          "$2a$10$JWc9R4WD/44.LTMHl4OfcOxLY/Q/ZvjOATdwhUvTaUjf6Fz4TkieW",
        profileImg:
          "https://th.bing.com/th/id/OIP.V33VQxg_ASEriHC2Cf0ktAHaHI?rs=1&pid=ImgDetMain",
        followers: [2, 6, 7],
        followings: [6, 1, 3, 2],
        gender: "MALE",
      },
      {
        id: 6,
        firstName: "Davendra",
        lastName: "bedwal",
        userName: null,
        email: "zyzz@mail.com",
        phone: "9891981132",
        password:
          "$2a$10$Z6nGNGToUJ.KnTOXFp5f9.xaLnGR0YSlkPCuAZWG07vfc6SSfrEX6",
        profileImg:
          "http://res.cloudinary.com/dumfcak5b/image/upload/v1736102589/buzzerUploads/gw0jd0ofugayxvseysau.jpg",
        followers: [4, 2],
        followings: [3, 2, 4],
        gender: "MALE",
      },
    ],
    comments: [
      {
        id: 2,
        content: "ok",
        commentedBy: {
          id: 6,
          firstName: "Davendra",
          lastName: "bedwal",
          userName: null,
          email: "zyzz@mail.com",
          phone: "9891981132",
          password:
            "$2a$10$Z6nGNGToUJ.KnTOXFp5f9.xaLnGR0YSlkPCuAZWG07vfc6SSfrEX6",
          profileImg:
            "http://res.cloudinary.com/dumfcak5b/image/upload/v1736102589/buzzerUploads/gw0jd0ofugayxvseysau.jpg",
          followers: [4, 2],
          followings: [3, 2, 4],
          gender: "MALE",
        },
        likedBy: [
          {
            id: 2,
            firstName: "mave",
            lastName: "med",
            userName: null,
            email: "mave@mail.com",
            phone: "9891981132",
            password:
              "$2a$10$O6Q8kHiT.X55Rwcq4EiQYewFo28SBK3yuj51O3HF6NeKEgsY40olq",
            profileImg:
              "https://th.bing.com/th/id/OIP.tZq4FbHI-2VuBSGkHjfyfAHaHa?w=209&h=209&c=7&r=0&o=5&dpr=1.5&pid=1.7",
            followers: [1, 4, 6],
            followings: [1, 4],
            gender: "MALE",
          },
        ],
        createdAt: null,
        updatedAt: "2025-01-07T13:46:33.231777",
      },
      {
        id: 3,
        content: "good",
        commentedBy: {
          id: 6,
          firstName: "Davendra",
          lastName: "bedwal",
          userName: null,
          email: "zyzz@mail.com",
          phone: "9891981132",
          password:
            "$2a$10$Z6nGNGToUJ.KnTOXFp5f9.xaLnGR0YSlkPCuAZWG07vfc6SSfrEX6",
          profileImg:
            "http://res.cloudinary.com/dumfcak5b/image/upload/v1736102589/buzzerUploads/gw0jd0ofugayxvseysau.jpg",
          followers: [4, 2],
          followings: [3, 2, 4],
          gender: "MALE",
        },
        likedBy: [],
        createdAt: "2025-01-07T13:48:54.122797",
        updatedAt: "2025-01-07T13:48:54.122797",
      },
    ],
    savedBy: [
      {
        id: 6,
        firstName: "Davendra",
        lastName: "bedwal",
        userName: null,
        email: "zyzz@mail.com",
        phone: "9891981132",
        password:
          "$2a$10$Z6nGNGToUJ.KnTOXFp5f9.xaLnGR0YSlkPCuAZWG07vfc6SSfrEX6",
        profileImg:
          "http://res.cloudinary.com/dumfcak5b/image/upload/v1736102589/buzzerUploads/gw0jd0ofugayxvseysau.jpg",
        followers: [4, 2],
        followings: [3, 2, 4],
        gender: "MALE",
      },
    ],
    createdAt: "2025-01-07T12:49:37.97579",
    updatedAt: "2025-01-07T12:49:37.97579",
  },
  {
    id: 3,
    caption: "code whenver u r free , whenever u feel like !!",
    mediaFiles: [
      "http://res.cloudinary.com/dumfcak5b/image/upload/v1736669088/buzzerUploads/lyr07b54hht9khop30u3.png",
    ],
    user: {
      id: 6,
      firstName: "Davendra",
      lastName: "bedwal",
      userName: null,
      email: "zyzz@mail.com",
      phone: "9891981132",
      password: "$2a$10$Z6nGNGToUJ.KnTOXFp5f9.xaLnGR0YSlkPCuAZWG07vfc6SSfrEX6",
      profileImg:
        "http://res.cloudinary.com/dumfcak5b/image/upload/v1736102589/buzzerUploads/gw0jd0ofugayxvseysau.jpg",
      followers: [4, 2],
      followings: [3, 2, 4],
      gender: "MALE",
    },
    tags: ["coding", "workhard", "challange"],
    location: "Noida",
    usersTagged: [],
    likedBy: [
      {
        id: 4,
        firstName: "Dave",
        lastName: "Mexe",
        userName: null,
        email: "dave123@mail.com",
        phone: "9876543210",
        password:
          "$2a$10$JWc9R4WD/44.LTMHl4OfcOxLY/Q/ZvjOATdwhUvTaUjf6Fz4TkieW",
        profileImg:
          "https://th.bing.com/th/id/OIP.V33VQxg_ASEriHC2Cf0ktAHaHI?rs=1&pid=ImgDetMain",
        followers: [2, 6, 7],
        followings: [6, 1, 3, 2],
        gender: "MALE",
      },
    ],
    comments: [
      {
        id: 17,
        content: "good",
        commentedBy: {
          id: 6,
          firstName: "Davendra",
          lastName: "bedwal",
          userName: null,
          email: "zyzz@mail.com",
          phone: "9891981132",
          password:
            "$2a$10$Z6nGNGToUJ.KnTOXFp5f9.xaLnGR0YSlkPCuAZWG07vfc6SSfrEX6",
          profileImg:
            "http://res.cloudinary.com/dumfcak5b/image/upload/v1736102589/buzzerUploads/gw0jd0ofugayxvseysau.jpg",
          followers: [4, 2],
          followings: [3, 2, 4],
          gender: "MALE",
        },
        likedBy: [],
        createdAt: "2025-01-12T13:44:30.171291",
        updatedAt: "2025-01-12T13:44:30.171291",
      },
      {
        id: 18,
        content: "lovely boi ",
        commentedBy: {
          id: 4,
          firstName: "Dave",
          lastName: "Mexe",
          userName: null,
          email: "dave123@mail.com",
          phone: "9876543210",
          password:
            "$2a$10$JWc9R4WD/44.LTMHl4OfcOxLY/Q/ZvjOATdwhUvTaUjf6Fz4TkieW",
          profileImg:
            "https://th.bing.com/th/id/OIP.V33VQxg_ASEriHC2Cf0ktAHaHI?rs=1&pid=ImgDetMain",
          followers: [2, 6, 7],
          followings: [6, 1, 3, 2],
          gender: "MALE",
        },
        likedBy: [],
        createdAt: "2025-01-12T20:36:11.626365",
        updatedAt: "2025-01-12T20:36:11.626365",
      },
    ],
    savedBy: [
      {
        id: 4,
        firstName: "Dave",
        lastName: "Mexe",
        userName: null,
        email: "dave123@mail.com",
        phone: "9876543210",
        password:
          "$2a$10$JWc9R4WD/44.LTMHl4OfcOxLY/Q/ZvjOATdwhUvTaUjf6Fz4TkieW",
        profileImg:
          "https://th.bing.com/th/id/OIP.V33VQxg_ASEriHC2Cf0ktAHaHI?rs=1&pid=ImgDetMain",
        followers: [2, 6, 7],
        followings: [6, 1, 3, 2],
        gender: "MALE",
      },
    ],
    createdAt: "2025-01-12T13:35:54.27974",
    updatedAt: "2025-01-12T13:35:54.27974",
  },
  {
    id: 4,
    caption: "love this pasta",
    mediaFiles: [
      "http://res.cloudinary.com/dumfcak5b/image/upload/v1736699878/buzzerUploads/vwzqc2mfwxtziamyf5hg.png",
    ],
    user: {
      id: 6,
      firstName: "Davendra",
      lastName: "bedwal",
      userName: null,
      email: "zyzz@mail.com",
      phone: "9891981132",
      password: "$2a$10$Z6nGNGToUJ.KnTOXFp5f9.xaLnGR0YSlkPCuAZWG07vfc6SSfrEX6",
      profileImg:
        "http://res.cloudinary.com/dumfcak5b/image/upload/v1736102589/buzzerUploads/gw0jd0ofugayxvseysau.jpg",
      followers: [4, 2],
      followings: [3, 2, 4],
      gender: "MALE",
    },
    tags: ["food", "tasty"],
    location: "gurgaon",
    usersTagged: [],
    likedBy: [
      {
        id: 6,
        firstName: "Davendra",
        lastName: "bedwal",
        userName: null,
        email: "zyzz@mail.com",
        phone: "9891981132",
        password:
          "$2a$10$Z6nGNGToUJ.KnTOXFp5f9.xaLnGR0YSlkPCuAZWG07vfc6SSfrEX6",
        profileImg:
          "http://res.cloudinary.com/dumfcak5b/image/upload/v1736102589/buzzerUploads/gw0jd0ofugayxvseysau.jpg",
        followers: [4, 2],
        followings: [3, 2, 4],
        gender: "MALE",
      },
      {
        id: 2,
        firstName: "mave",
        lastName: "med",
        userName: null,
        email: "mave@mail.com",
        phone: "9891981132",
        password:
          "$2a$10$O6Q8kHiT.X55Rwcq4EiQYewFo28SBK3yuj51O3HF6NeKEgsY40olq",
        profileImg:
          "https://th.bing.com/th/id/OIP.tZq4FbHI-2VuBSGkHjfyfAHaHa?w=209&h=209&c=7&r=0&o=5&dpr=1.5&pid=1.7",
        followers: [1, 4, 6],
        followings: [1, 4],
        gender: "MALE",
      },
    ],
    comments: [],
    savedBy: [],
    createdAt: "2025-01-12T22:09:04.689716",
    updatedAt: "2025-01-12T22:09:04.689716",
  },
  {
    id: 5,
    caption: "Toby is insane !!",
    mediaFiles: [
      "http://res.cloudinary.com/dumfcak5b/video/upload/v1736934178/buzzerUploads/buzzer_video.mp4",
    ],
    user: {
      id: 2,
      firstName: "mave",
      lastName: "med",
      userName: null,
      email: "mave@mail.com",
      phone: "9891981132",
      password: "$2a$10$O6Q8kHiT.X55Rwcq4EiQYewFo28SBK3yuj51O3HF6NeKEgsY40olq",
      profileImg:
        "https://th.bing.com/th/id/OIP.tZq4FbHI-2VuBSGkHjfyfAHaHa?w=209&h=209&c=7&r=0&o=5&dpr=1.5&pid=1.7",
      followers: [1, 4, 6],
      followings: [1, 4],
      gender: "MALE",
    },
    tags: ["parkour", "insane", "amazing"],
    location: "London",
    usersTagged: [],
    likedBy: [],
    comments: [],
    savedBy: [],
    createdAt: "2025-01-15T15:14:08.063397",
    updatedAt: "2025-01-15T15:14:08.063397",
  },
  {
    id: 6,
    caption: "NamasteJS",
    mediaFiles: [
      "http://res.cloudinary.com/dumfcak5b/image/upload/v1740224408/buzzerUploads/ozpbhml295yfgmymey8y.png",
    ],
    user: {
      id: 7,
      firstName: "Shubham",
      lastName: "Jangid",
      userName: null,
      email: "shubhamjangid@gmail.com",
      phone: "9917014008",
      password: "$2a$10$rLcLNm7wY4GVIeSg7dEw1e0juX9oiHP9eXJsordtRFcTZEkPpVT6a",
      profileImg:
        "http://res.cloudinary.com/dumfcak5b/image/upload/v1740224212/buzzerUploads/ywtz0rufccvalep1bjto.jpg",
      followers: [],
      followings: [3, 4],
      gender: "MALE",
    },
    tags: ["Pdhai", "Nahi Krunga"],
    location: "UP",
    usersTagged: [],
    likedBy: [],
    comments: [
      {
        id: 21,
        content: "Yoo",
        commentedBy: {
          id: 7,
          firstName: "Shubham",
          lastName: "Jangid",
          userName: null,
          email: "shubhamjangid@gmail.com",
          phone: "9917014008",
          password:
            "$2a$10$rLcLNm7wY4GVIeSg7dEw1e0juX9oiHP9eXJsordtRFcTZEkPpVT6a",
          profileImg:
            "http://res.cloudinary.com/dumfcak5b/image/upload/v1740224212/buzzerUploads/ywtz0rufccvalep1bjto.jpg",
          followers: [],
          followings: [3, 4],
          gender: "MALE",
        },
        likedBy: [
          {
            id: 7,
            firstName: "Shubham",
            lastName: "Jangid",
            userName: null,
            email: "shubhamjangid@gmail.com",
            phone: "9917014008",
            password:
              "$2a$10$rLcLNm7wY4GVIeSg7dEw1e0juX9oiHP9eXJsordtRFcTZEkPpVT6a",
            profileImg:
              "http://res.cloudinary.com/dumfcak5b/image/upload/v1740224212/buzzerUploads/ywtz0rufccvalep1bjto.jpg",
            followers: [],
            followings: [3, 4],
            gender: "MALE",
          },
        ],
        createdAt: "2025-02-22T17:10:59.07902",
        updatedAt: "2025-02-22T17:10:59.07902",
      },
    ],
    savedBy: [],
    createdAt: "2025-02-22T17:10:10.099047",
    updatedAt: "2025-02-22T17:10:10.100094",
  },
  {
    id: 7,
    caption: "",
    cols: 3,
    rows: 1.5,
    mediaFiles: [
      "http://res.cloudinary.com/dumfcak5b/image/upload/v1740280725/buzzerUploads/k47fkx9zie1jffxv06rd.jpg",
    ],
    user: {
      id: 7,
      firstName: "Shubham",
      lastName: "Jangid",
      userName: null,
      email: "shubhamjangid@gmail.com",
      phone: "9917014008",
      password: "$2a$10$rLcLNm7wY4GVIeSg7dEw1e0juX9oiHP9eXJsordtRFcTZEkPpVT6a",
      profileImg:
        "http://res.cloudinary.com/dumfcak5b/image/upload/v1740224212/buzzerUploads/ywtz0rufccvalep1bjto.jpg",
      followers: [],
      followings: [3, 4],
      gender: "MALE",
    },
    tags: [],
    location: "",
    usersTagged: [],
    likedBy: [],
    comments: [],
    savedBy: [],
    createdAt: "2025-02-23T08:48:48.613155",
    updatedAt: "2025-02-23T08:48:48.613155",
  },
];

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const ExploreComp = () => {
  return (
    <div className="flex justify-center overflow-y-auto">
      <ImageList
        sx={{ width: "80%", height: "100%" }}
        variant="quilted"
        cols={4}
        rowHeight={121}
      >
        {itemData.map((item) => (
          <ImageListItem
            key={item.id}
            cols={item.cols || 1}
            rows={item.rows || 1}
          >
            <img
              {...srcset(item.mediaFiles[0], 121, item.rows, item.cols)}
              alt={item.caption}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Card raised={true}>
        <CardHeader
        // title={camera.cameraName}
        />

        <CardActionArea>
          <CardMedia
            component="video"
            // className={classes.media}
            image={
              "https://videos.pexels.com/video-files/8439147/8439147-sd_640_360_25fps.mp4"
            }
            autoPlay
          />
          {/* <CardContent></CardContent> */}
        </CardActionArea>
      </Card>
    </div>
  );
};

export default ExploreComp;
