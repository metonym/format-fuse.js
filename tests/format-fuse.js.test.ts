import { test, expect } from "vitest";
import formatFuseJs from "../src/format-fuse.js";

test("format-fuse.js", () => {
  expect(
    formatFuseJs([
      {
        item: {
          title: "Monster 1959",
          author: { firstName: "David", lastName: "Maine" },
        },
        matches: [
          {
            indices: [[1, 2]],
            value: "Monster 1959",
            key: "title",
            arrayIndex: 0,
          },
        ],
      },
    ])
  ).toEqual([
    {
      author: { firstName: "David", lastName: "Maine" },
      title: [
        { matches: false, text: "M" },
        { matches: true, text: "on" },
        { matches: false, text: "ster 1959" },
      ],
    },
  ]);

  expect(
    formatFuseJs([
      {
        item: {
          title: "Old Man's War",
          author: {
            firstName: [{ text: "John", matches: true }],
            lastName: "Scalzi",
          },
        },
        matches: [
          {
            indices: [[0, 3]],
            value: "John",
            key: "author.firstName",
            arrayIndex: 0,
          },
        ],
      },
    ])
  ).toEqual([
    {
      author: {
        firstName: [{ matches: true, text: "John" }],
        lastName: "Scalzi",
      },
      title: "Old Man's War",
    },
  ]);

  expect(
    formatFuseJs([
      {
        item: {
          title: "Old Man's War",
          author: {
            firstName: [{ text: "John", matches: true }],
            lastName: "Scalzi",
          },
        },
        matches: [
          {
            indices: [[0, 3]],
            value: "John",
            key: "author.firstName",
            arrayIndex: 0,
          },
        ],
      },
      {
        item: {
          title: "Monster 1959",
          author: { firstName: "David", lastName: "Maine" },
        },
        matches: [
          {
            indices: [[1, 2]],
            value: "Monster 1959",
            key: "title",
            arrayIndex: 0,
          },
        ],
      },
      {
        item: {
          title: "Colony",
          author: { firstName: "Rob", lastName: "Grant" },
        },
        matches: [
          {
            indices: [
              [1, 1],
              [3, 4],
            ],
            value: "Colony",
            key: "title",
            arrayIndex: 0,
          },
        ],
      },
    ])
  ).toEqual([
    {
      author: {
        firstName: [{ matches: true, text: "John" }],
        lastName: "Scalzi",
      },
      title: "Old Man's War",
    },
    {
      author: { firstName: "David", lastName: "Maine" },
      title: [
        { matches: false, text: "M" },
        { matches: true, text: "on" },
        { matches: false, text: "ster 1959" },
      ],
    },
    {
      author: { firstName: "Rob", lastName: "Grant" },
      title: [
        { matches: false, text: "C" },
        { matches: true, text: "o" },
        { matches: false, text: "l" },
        { matches: true, text: "on" },
        { matches: false, text: "y" },
      ],
    },
  ]);
});
