const noteSchema: Schema<INote> = new Schema({
    title: { type: String },
    detail: { type: String },
    date: {
        type: Date,
        default: () => {
            const now = new Date();
            return now.setHours(now.getHours() + 3)
        }
    },
    color: { type: String } // veya type: Number
})