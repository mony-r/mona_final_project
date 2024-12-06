import React, { useState } from 'react';

// Function component for giving reviews
function GiveReviews({ onSubmit, consultationId }) {
    const [showForm, setShowForm] = useState(false);
    const [submittedMessage, setSubmittedMessage] = useState('');
    const [showWarning, setShowWarning] = useState(false);
    const [name, setName] = useState('');
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0); // New state for rating
    const [isSubmitted, setIsSubmitted] = useState(false); // Track if the form has been submitted

    // Function to handle button click event
    const handleButtonClick = () => {
        setShowForm(true);
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if all required fields are filled before submission
        if (name && review && rating > 0) {
            setSubmittedMessage(`Name: ${name}, Review: ${review}, Rating: ${rating}`);
            setShowWarning(false); // Hide warning if all fields are filled
            setIsSubmitted(true); // Set the form as submitted
            onSubmit({ name, review, rating, consultationId }); // Pass rating with other data
        } else {
            // If fields are not filled, show a warning message
            setShowWarning(true);
        }
    };

    // Function to handle rating selection (either stars or numbers)
    const handleRatingChange = (newRating) => {
        if (!isSubmitted) {
            setRating(newRating);
        }
    };

    return (
        <div className="flex justify-center p-6">
            <div className="w-96 bg-gray-50 p-6 rounded-lg shadow-lg">
                <form onSubmit={handleSubmit}>
                    <div className="text-center mb-4 text-xl font-semibold">Give Your Review</div>
                    
                    {/* Display warning message if not all fields are filled */}
                    {showWarning && <p className="text-red-500 text-center mb-2">Please fill out all fields.</p>}

                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            disabled={isSubmitted}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="review" className="block text-sm font-medium text-gray-700">Review:</label>
                        <textarea
                            id="review"
                            name="review"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            disabled={isSubmitted}
                        />
                    </div>

                    {/* Rating selector */}
                    <div className="mb-4">
                        <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating:</label>
                        <div className="flex justify-center space-x-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={`text-2xl cursor-pointer transition-colors duration-300 ${star <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
                                    onClick={() => handleRatingChange(star)}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Submit button */}
                    <button 
                        type="submit" 
                        className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
                        disabled={isSubmitted}
                    >
                        Submit
                    </button>
                </form>

                {/* Display the submitted message if available */}
                {submittedMessage && (
                    <div className="mt-4 text-center">
                        <h3 className="font-semibold text-lg">Submitted Message:</h3>
                        <p>{submittedMessage}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default GiveReviews;
