const Support = () => {
    return (
        <div className="mt-10 p-4 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Support</h1>

            <div className="mb-6 border p-4 rounded shadow">
                <p className="text-lg mb-4">
                    Need help? Fill out the form below, and our team will get back to you as soon as possible.
                </p>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Your Name"
                            className="w-full border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Your Email"
                            className="w-full border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-1">
                            Message
                        </label>
                        <textarea
                            id="message"
                            placeholder="Your Message"
                            className="w-full border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Support;
