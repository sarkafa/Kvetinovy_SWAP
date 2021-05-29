import React, { useEffect, useState } from 'react';
import './style.css';
import { db, storage } from './../firebase';

const Wishlist = () => {
  const [filename, setFilename] = useState('Pridejte kyku do wishlistu...');
  const [fileUrl, setFileUrl] = useState(null);
  const [users, setUsers] = useState([]);

  const onFileChange = (e) => {
    const file = e.target.files[0];
    const storageRef = storage.ref();
    const fileRef = storageRef.child(file.name);
    fileRef.put(file).then(() => {
      console.log('Uploaded file', file.name);
    });

    setFilename(`Nahraná kytka: ${e.target.value.split('\\').pop()}`);
  };

  //   const username = e.target.username.value;
  //   // if (!username) {
  //   //   return;
  //   // }
  //   db.collection('users')
  //     .doc(username)
  //     .set({ name: username, avatar: fileUrl });

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const usersCollection = await db.collection('users').get();
  //     setUsers(
  //       usersCollection.docs.map((doc) => {
  //         return doc.data();
  //       }),
  //     );
  //   };
  //   fetchUser(), [];
  // });
  // .then(() => {
  //   console.log('Uploaded file', file.name);
  //       });
  return (
    <>
      <input
        type="file"
        name="file"
        id="file"
        className="inputfile"
        onChange={onFileChange}
      />
      <label for="file">
        <div>{filename}</div>

        <img src="/assets/cross.svg" alt="" />
      </label>

      <br />
      <br />
      <div>
        {/* <ul>
          {users.map((user) => {
            return (
              <li>
                <img width="100" height="100" src={user.avatar} alt="" />
                <p>{user.name}</p>
              </li>
            );
          })}
        </ul> */}
      </div>
    </>
  );
};

export default Wishlist;
