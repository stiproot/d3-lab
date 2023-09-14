import { defineStore } from "pinia";
import { getTree } from "@/services/data.service.js";

export const useStructuredTreeStore = defineStore({
  id: "structured-trees",
  state: () => ({
    summarized_tree: {},
    weighted_tree: {},
  }),
  actions: {
    SET_SUMMARIZED_TREE(data) {
      this.summarized_tree = data;
    },
    SET_WEIGHTED_TREE(data) {
      this.weighted_tree = data;
    },
    async fetchSummarizedTree() {
      const data = await getTree("summarized_tree");
      this.SET_SUMMARIZED_TREE(data);
    },
    async fetchWeightedTree() {
      const data = await getTree("weighted_tree");
      this.SET_WEIGHTED_TREE(data);
    },
    async init() {
      await this.fetchSummarizedTree();
      await this.fetchWeightedTree();
    },
  },
  getters: {
    getSummarizedTree() {
      return this.summarized_tree;
    },
    getWeightedTree() {
      return this.weighted_tree;
    },
  },
});
