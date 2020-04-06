const libraryService = {
    findAllBooks: async function(query) {
        return [];
    },
    addBook: async function(bookDetails) {
        const {title, author, description} = bookDetails;
        console.log(`Adding book ${title} by ${author}`);
        return {};
    },
}

export default libraryService;