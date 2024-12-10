import connectDB from "@/utils/mongoose";
import Task from "@/models/Task";
import TaskCard from "@/components/TaskCard";

async function loadTasks(){
  await connectDB()
  const tasks = await Task.find()
  return tasks
}

export const revalidate = 0; // Siempre obtiene datos frescos

async function Home() {
	const tasks = await loadTasks();
	return (
    
		<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
      {console.log(tasks)}
			{tasks.map((task) => (
				<TaskCard task={task} key={task._id} />
			))}
		</div>
	);
}

export default Home;
