import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import amplifyConfig from '../amplify_outputs.json';
import { generateClient } from 'aws-amplify/data';
import { uploadData, getUrl, remove } from 'aws-amplify/storage';

import type { Schema } from '../amplify/data/resource'; // adjust the path if needed

Amplify.configure(amplifyConfig);
const client = generateClient<Schema>();

function App() {
  const [notes, setNotes] = useState<(Schema['Note']['type'] & { imageUrl?: string })[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null as File | null,
  });

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const { data } = await client.models.Note.list();
    const notesWithImages = await Promise.all(
      data.map(async (note) => {
        if (note.imageKey) {
          const { url } = await getUrl({ key: note.imageKey });
          return { ...note, imageUrl: url };
        }
        return note;
      })
    );
    setNotes(notesWithImages);
  };

  const createNote = async (event: FormEvent) => {
    event.preventDefault();

    let imageKey: string | undefined;
    if (formData.image) {
      const result = await uploadData({
        key: `${Date.now()}-${formData.image.name}`,
        data: formData.image,
      }).result;
      imageKey = result.key;
    }

    await client.models.Note.create({
      title: formData.title,
      content: formData.content,
      imageKey,
    });

    setFormData({ title: '', content: '', image: null });
    fetchNotes();
  };

  const deleteNote = async (id: string, imageKey?: string | null) => {
    await client.models.Note.delete({ id });
    if (imageKey) {
      await remove({ key: imageKey });
    }
    fetchNotes();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
          <h2>Hello, {user?.username}</h2>
          <button onClick={signOut}>Sign out</button>

          <h3>Create a new note</h3>
          <form onSubmit={createNote}>
            <input
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
            <br />
            <textarea
              name="content"
              placeholder="Content"
              value={formData.content}
              onChange={handleInputChange}
              required
            />
            <br />
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <br />
            <button type="submit">Create Note</button>
          </form>

          <h3>Your Notes</h3>
          {notes.map((note) => (
            <div key={note.id} style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
              <h4>{note.title}</h4>
              <p>{note.content}</p>
              {note.imageUrl && <img src={note.imageUrl} alt="Note" style={{ maxWidth: '100%' }} />}
              <button onClick={() => deleteNote(note.id, note.imageKey)}>Delete</button>
            </div>
          ))}
        </main>
      )}
    </Authenticator>
  );
}

export default App;
