import mongoose from "mongoose";

const conn = {
    isConnected: false,
};

const connectDB = async () => {
    if (conn.isConnected) return;

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI);

        conn.isConnected = db.connections[0].readyState;
        console.log(`MongoDB conectado a: ${db.connection.db.databaseName}`);
    } catch (error) {
        console.error("Error al conectar con MongoDB:", error);
        throw new Error("Error al conectar con MongoDB");
    }
};

// Eventos de conexión
mongoose.connection.on("connected", () => {
    console.log("MongoDB está conectado");
});

mongoose.connection.on("error", (err) => {
    console.error("Error en la conexión a MongoDB:", err);
});

export default connectDB;