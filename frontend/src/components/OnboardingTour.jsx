import { useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const OnboardingTour = () => {
  const startTour = () => {
    const driverObj = driver({
      showProgress: true,
      allowClose: true,
      nextBtnText: "Next",
      prevBtnText: "Back",
      doneBtnText: "Finish",

      steps: [
        {
          element: ".dashboard-hero",
          popover: {
            title: "Welcome",
            description:
              "This is your financial dashboard where you can monitor your complete financial overview.",
          },
        },
        {
          element: ".stat-cards",
          popover: {
            title: "Financial Summary",
            description:
              "These cards display your total balance, income, expenses, and savings.",
          },
        },
        {
          element: ".sidebar-expenses",
          popover: {
            title: "Expenses",
            description:
              "Track and manage all your expenses from this section.",
          },
        },
        {
          element: ".sidebar-income",
          popover: {
            title: "Income",
            description:
              "Add and monitor your income sources here.",
          },
        },
        {
          element: ".sidebar-budgets",
          popover: {
            title: "Budgets",
            description:
              "Set category-wise budgets and control your spending.",
          },
        },
        {
          element: ".sidebar-analytics",
          popover: {
            title: "Analytics",
            description:
              "View charts and trends to better understand your finances.",
          },
        },
        {
          element: ".floating-ai-button",
          popover: {
            title: "AI Assistant",
            description:
              "Use your AI Finance Assistant to generate personalized financial insights.",
          },
        },
      ],

      onDestroyed: () => {
        localStorage.setItem("hasSeenTour", "true");
      },
    });

    driverObj.drive();
  };

  useEffect(() => {
    // Automatically start for first-time users
    const hasSeenTour =
      localStorage.getItem("hasSeenTour");

    if (!hasSeenTour) {
      const timer = setTimeout(() => {
        startTour();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // Listen for manual restart requests
    const handleStartTour = () => {
      setTimeout(() => {
        startTour();
      }, 300);
    };

    window.addEventListener(
      "start-onboarding-tour",
      handleStartTour
    );

    return () => {
      window.removeEventListener(
        "start-onboarding-tour",
        handleStartTour
      );
    };
  }, []);

  return null;
};

export default OnboardingTour;