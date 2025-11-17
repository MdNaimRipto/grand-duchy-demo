import { IReadList } from "./readlist.interface";
import { ReadList } from "./readlist.schema";

const createReadList = async (payload: IReadList) => {
  const { bookId, email } = payload;

  const isExists = await ReadList.findOne({ bookId, email });
  if (isExists) {
    const result = await ReadList.findOneAndUpdate({ bookId, email }, payload, {
      new: true,
    });
    return result;
  }

  const result = await ReadList.create(payload);
  return result;
};

const getLatestReadList = async (email: string) => {
  const result = await ReadList.findOne({ email }).sort({ updatedAt: -1 });
  return result;
};

const getReadListDetails = async (email: string, bookId: string) => {
  const result = await ReadList.findOne({ email, bookId });
  return result;
};

export const ReadListService = {
  createReadList,
  getLatestReadList,
  getReadListDetails,
};
