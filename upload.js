document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('upload-form');
    const fileInput = document.getElementById('file-input');
    const uploadButton = document.getElementById('upload-button');
    const messageDiv = document.getElementById('message');

    
    uploadButton.addEventListener('click', async () => {
        
        const formData = new FormData();
        formData.append('file', fileInput.files[0]);
        console.log(formData)
        try {
            const response = await fetch('http:localhost:3000/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                messageDiv.textContent = `File uploaded successfully. Server response: ${JSON.stringify(data)}`;
            } else {
                messageDiv.textContent = 'File upload failed.';
            }
        } catch (error) {
            console.error('Error:', error);
            messageDiv.textContent = 'An error occurred during file upload.';
        }
    });
});
