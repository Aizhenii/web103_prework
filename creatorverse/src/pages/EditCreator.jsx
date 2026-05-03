import React from 'react';

const EditCreator = () => {
  return (
    <main className="edit-creator-page">
      <h1>Edit Creator</h1>
      <p>Update creator profile and details here.</p>
      <form className="edit-creator-form">
        <label>
          Name
          <input type="text" name="name" placeholder="Creator name" />
        </label>
        <label>
          Bio
          <textarea name="bio" placeholder="Creator bio" rows="4" />
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </main>
  );
};

export default EditCreator;
