import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; 
import { ref as dbRef, set, push } from 'firebase/database'; 
import { db, storage } from '../firebase';

const UploadBook = () => {
    const [bookName, setBookName] = useState('');
    const [author, setAuthor] = useState('');
    const [file, setFile] = useState(null); 
    const [coverImage, setCoverImage] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    const handleCoverChange = (e) => {
        setCoverImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!bookName || !author || !file || !coverImage) {
            alert("Please fill in all fields and upload a PDF file and an image.");
            return;
        }
        

        try {
            const pdfStorageRef = ref(storage, `books/${file.name}`);
            const coverStorageRef = ref(storage, `covers/${coverImage.name}`);

            const pdfSnapshot = await uploadBytes(pdfStorageRef, file);
            const coverSnapshot = await uploadBytes(coverStorageRef, coverImage);

            const pdfDownloadURL = await getDownloadURL(pdfSnapshot.ref);
            const coverDownloadURL = await getDownloadURL(coverSnapshot.ref);

            const newBookRef = push(dbRef(db, 'books'));
            await set(newBookRef, {
                bookName,
                author,
                downloadURL: pdfDownloadURL,
                coverImageUrl: coverDownloadURL, 
            });

            alert('Book uploaded successfully!');
            setBookName('');
            setAuthor('');
            setFile(null);
            setCoverImage(null);
        } catch (error) {
            console.error("Error uploading book:", error);
            alert('Failed to upload book: ' + error.message);
        }
    };

    return (
        <div className="form-container">
            <h2>Upload a Book (PDF)</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Book Name:</label>
                    <input
                        type="text"
                        placeholder="Enter book name"
                        value={bookName}
                        onChange={(e) => setBookName(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Author:</label>
                    <input
                        type="text"
                        placeholder="Enter author's name"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Upload Cover Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleCoverChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Upload PDF/EPUB File:</label>
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                <center><button type="submit">Upload Book</button></center>
            </form>
        </div> 
    );
};

export default UploadBook;
