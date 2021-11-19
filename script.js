"use strict!";

const init = () => {
  document.querySelectorAll(".tooltip").forEach((el) =>
    el.addEventListener("click", (e) => {
      e.target.nextElementSibling.classList.remove("hidden");
      document.querySelector(".overlay").classList.remove("hidden");
    })
  );

  document.addEventListener("scroll", () => {
    const links = Array.from(document.querySelectorAll(".nav__link"));
    const sections = document.querySelectorAll(".topics");

    const setFocus = () => {
      const removeClass = (params) => {
        params.elements.forEach((el) => el.classList.add(params.class));
      };

      const addClass = (params) => {
        params.elements.forEach((el, i) => {
          const top = el.getBoundingClientRect().top;
          const bottom = el.getBoundingClientRect().bottom;

          if (top >= 40) {
            params.element[i].classList.remove(params.class);
          }
        });
      };

      removeClass({ elements: links, class: "highlight" });
      addClass({ elements: sections, class: "highlight", element: links });
    };

    setFocus();
  });

  document.querySelectorAll(".modal").forEach((modal) =>
    modal.addEventListener("click", (e) => {
      e.target.closest(".modal").classList.add("hidden");
      document.querySelector(".overlay").classList.add("hidden");
    })
  );

  document.querySelector(".overlay").addEventListener("click", (e) => {
    document.querySelector(".modal:not(.hidden)").classList.add("hidden");
    document.querySelector(".overlay").classList.add("hidden");
  });

  const goTo = () => {
    const navs = document.querySelectorAll(".nav__link");
    const sections = document.querySelectorAll(".topics");

    navs.forEach((el, i) =>
      el.addEventListener("click", () => {
        // alignToTop true, false
        // options {behavior: auto or smooth, block: start, center, end, nearest,nearest, inline: start, center, end}
        sections[i].scrollIntoView(true, {
          behavior: "smooth",
          block: "end",
        });

        const scrollDown = sections[i].getBoundingClientRect().top - 30;

        window.scrollBy(0, scrollDown);
      })
    );
  };

  const viewResult = () => {
    const topics = document.querySelectorAll(".topics");
    const arr = [];

    const getAnswer = (el) => {
      const answer = el.querySelector(".textarea");

      if (answer !== null) {
        return answer.value;
      } else {
        return "";
      }
    };

    const getScore = (el) => {
      const score = el.querySelector('input[class="radio__input"]:checked');

      if (score !== null) {
        return score.value;
      } else {
        return "";
      }
    };

    const getAverage = (arr) => {
      let avg = "";
      const arrFiltered = arr.filter((r) => r !== "");
      avg = arrFiltered.reduce((acc, n, i, arrFiltered) => {
        return acc + Number(n) / arrFiltered.length;
      }, 0);
      return avg === 0 ? "" : avg.toFixed(2);
    };

    const getAnswers = (el) => {
      const obj = {
        info: [],
        answers: [],
        scores: [],
      };

      const answers = Array.from(
        el.querySelectorAll(".topic__questions-answers")
      );

      if (answers.length !== 0) {
        answers.forEach((answer, i) => {
          obj.answers.push(getAnswer(answer));
          obj.scores.push(getScore(answer));
        });
      }

      return obj;
    };

    topics.forEach((topic, i) => {
      // FORMAT FOR INFO
      if (i === 0) {
        let obj = { topic: "INFORMATION", answers: [] };
        obj.answers.push(
          Array.from(topic.querySelectorAll("input")).map((el) => el.value)
        );
        arr.push(obj);
      }

      // FORMAT FOR TOPICS
      if (i !== 0 && i !== 1 && i !== topics.length - 1) {
        const { answers, scores } = getAnswers(topic);
        const obj = {
          topic: topic.querySelector(".topic__title").innerText,
          average: "",
          answers: answers,
          scores: scores,
        };

        if (i === topics.length - 2) {
          obj.answers.pop();
          obj.scores.pop();
        }
        obj.average = getAverage(obj.scores);
        arr.push(obj);
      }

      // FORMAT FOR ADDITOINAL ASSESSMENT
      if (i === topics.length - 1) {
        const { answers, scores } = getAnswers(topic);
        const obj = {
          topic: topic.querySelector(".topic__title").innerText,
          average: "",
          answers: answers,
          scores: scores,
        };
        obj.scores.pop();
        obj.average = getAverage(obj.scores);
        obj.scores.push(obj.answers.pop());
        obj.answers = Array.from(
          topic.querySelectorAll(".topic__questions-answers")
        ).map((el) => el.querySelector("span").innerText);
        arr.push(obj);
      }
    });

    Confirm.open({
      title: "INTERVIEW SUMMARY",
      okText: "CONFIRM",
      cancelText: "CANCEL",
      data: arr,
      onok: () => submitData(),
      oncancel: () => "",
    });
  };

  const getResult = () => {
    const arr = Array.from(document.querySelectorAll(".data")).map((el, i) => {
      return [i, el.innerText];
    });

    return arr;
  };

  async function submitData() {
    // Push data in Google Sheets from external app :
    const obj = Object.fromEntries(getResult());
    const arr = [];

    for (const [key, value] of Object.entries(obj)) {
      arr.push(value);
    }

    const request_url =
      "https://script.google.com/macros/s/AKfycbwhMQMClG6d6MD4aNWz9Dq7eKfPG6hEjqglrLQTmN2ay78MD9AYp3uH4el1bDBHzqJ-/exec";

    fetch(request_url, {
      method: "POST",
      mode: "no-cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      body: JSON.stringify(obj),
    });
  }

  goTo();

  document.querySelector(".button").addEventListener("click", viewResult);
};

document.addEventListener("DOMContentLoaded", init);
