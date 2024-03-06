import { create } from "zustand";

type Tag = {
  name: string;
  category: string;
  value: number;
  id: string;
};

type CartStore = {
  tags: Tag[] | [];
  addTags: (tags: Tag[]) => void;
};

export const useTagstore = create<CartStore>((set) => ({
  tags: [],
  addTags: (allTags) => set(() => ({ tags: allTags})),
}));
