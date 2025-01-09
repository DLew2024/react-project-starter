import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteUser = createAsyncThunk("users/delete", async (user) => {
  const { data: userAlbums } = await axios.get(
    `http://localhost:3005/albums?userId=${user.id}`
  );

  for (let album of userAlbums) {
    const { data: albumPhotos } = await axios.get(
      `http://localhost:3005/photos?albumId=${album.id}`
    );

    for (let photo of albumPhotos) {
      await axios.delete(`http://localhost:3005/photos/${photo.id}`);
    }

    await axios.delete(`http://localhost:3005/albums/${album.id}`);
  }
  await axios.delete(`http://localhost:3005/users/${user.id}`);

  return user;
});
