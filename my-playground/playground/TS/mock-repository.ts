export const mockRepository = <T extends { id: string }>(datas: T[]) => {
  return {
    async findAll() {
      return datas;
    },
    async findUnique(id: string) {
      const item = datas.find((d) => d.id === id);
      if (!item) return null;
      return item;
    },
  };
};
