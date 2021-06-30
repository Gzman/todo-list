import { Project } from "../buisness-logic/project"
import { Task } from "../buisness-logic/task"

const randomDaysInTheFuture = (days) => {
    const randOffset = Math.floor(Math.random() * days);
    const randomDate = new Date(); 
    randomDate.setTime(Date.now() + (1000 * 60 * 60 * 24 * randOffset));
    return randomDate;
}

const createExampleProjects = () => {
    const example = new Project("Example");
    example.tasks = [
        new Task("Grocery shopping", "Milk, apples, bananas, bread", randomDaysInTheFuture(3), "Low", true),
        new Task("Help moving", "Help a friend moving to munich", randomDaysInTheFuture(30), "Medium"),
    ];

    const homework = new Project("Homework");
    homework.tasks = [
        new Task("Weight training", "10 reps , with 40kg, three times", randomDaysInTheFuture(15), "Low"),
        new Task("Cutting tree branches", "Old dry/dead branches needs to be cut", randomDaysInTheFuture(10), "Low", true),
        new Task("Car cleaning", "Wash and vacuum clean the car", randomDaysInTheFuture(10), "Low", true),
        new Task("Garage cleaning", "", randomDaysInTheFuture(30), "High"),
    ];

    const WebDevelopment = new Project("Web development");
    WebDevelopment.tasks = [
        new Task("Learn react", "", randomDaysInTheFuture(20), "Medium"),
        new Task("Learn NoSql", "", randomDaysInTheFuture(20), "Medium"),
        new Task("Learn Design Patterns", "", randomDaysInTheFuture(22), "High"),
        new Task("Learn a Js framework", "", randomDaysInTheFuture(30), "Low"),
    ];

    return [example, homework, WebDevelopment];
}

export { createExampleProjects }