
const initFeedback = (feedbackClassname) => {
    const $feedback = document.querySelector(feedbackClassname);

    const reset = () => {
        $feedback.classList.remove("showItem");
        $feedback.textContent = "";
    }

    const render = (errors) => {
        reset();
        errors.forEach(error => {
            const $error = document.createElement("p");
            $error.textContent = error;
            $feedback.append($error);
        });
        $feedback.classList.add("showItem");
    }
    
    return { render, reset }
};

export { initFeedback }