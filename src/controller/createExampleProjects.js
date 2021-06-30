import { Project } from "../buisness-logic/project"
import { Task } from "../buisness-logic/task"

const randomDate = () => {
    const today = new Date();
    const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
    const possibleDays = daysInMonth(today.getMonth(), today.getFullYear()) - today.getDate();
    const days = [];
    for (let i = possibleDays; i >= 0; i--) {
        days.push(today.getDate() + i);
    }
    return new Date(today.getFullYear(), today.getMonth(), days[Math.floor(Math.random() * days.length)]);
}

const createExampleProjects = () => {
    const exampleProject = new Project("Example");
    exampleProject.tasks = [
        new Task("Grocery shopping", "Milk, apples, bananas, bread", randomDate(), "Low", true),
        new Task("Help moving", "Help a friend moving to munich", randomDate(), "Medium"),
    ];

    const homework = new Project("Homework");
    homework.tasks = [
        new Task("Weight training", "10 reps , with 40kg, three times", randomDate(), "Low"),
        new Task("Cutting tree branches", "Old dry/dead branches needs to be cut", randomDate(), "Low", true),
        new Task("Car cleaning", "Wash and vacuum clean the car", randomDate(), "Low", true),
    ];

    const WebDevelopment = new Project("Web development");
    WebDevelopment.tasks = [
        new Task("Learn react", "", randomDate(), "Medium"),
        new Task("Learn NoSql", "MongoDb", randomDate(), "Medium"),
        new Task("Learn Design Patterns", "Learn the types of the patterns and to rekognize when to use it", randomDate(), "Low"),
        new Task("Learn a Js framework", "For instance Angular", randomDate(), "Low"),
    ];

    return [exampleProject, homework, WebDevelopment];
}

export { createExampleProjects }