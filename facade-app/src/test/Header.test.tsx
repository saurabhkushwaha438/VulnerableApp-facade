import React from "react";
import { render, screen } from "@testing-library/react";

import Header from "../Components/Header";

describe("Header", () => {
  it("renders correctly", () => {
    const mock = () => jest.fn();
    const state = {
      isSuccessfullyLoaded: false,
      activateAboutUsPage: false,
      activateHomePage: true,
      showHints: false,
      isChallengeModeEnabled: false,
    };

    const { container } = render(
      <Header setGlobalState={mock} globalState={state} />
    );

    expect(container).toMatchSnapshot();
  });

  it("renders header image", () => {
    const mock = () => jest.fn();
    const state = {
      isSuccessfullyLoaded: false,
      activateAboutUsPage: false,
      activateHomePage: true,
      showHints: false,
      isChallengeModeEnabled: false,
    };

    render(<Header setGlobalState={mock} globalState={state} />);

    const image = screen.getAllByRole("img")[0];

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("alt", "vulnerable app logo");
  });

  it("renders first nav item", () => {
    const mock = () => jest.fn();
    const state = {
      isSuccessfullyLoaded: false,
      activateAboutUsPage: false,
      activateHomePage: true,
      showHints: false,
      isChallengeModeEnabled: false,
    };

    render(<Header setGlobalState={mock} globalState={state} />);

    const item = screen.getByText("Owasp VulnerableApp-Facade");

    expect(item).toBeInTheDocument();
  });

  it("renders second nav item", () => {
    const mock = () => jest.fn();
    const state = {
      isSuccessfullyLoaded: false,
      activateAboutUsPage: false,
      activateHomePage: true,
      showHints: false,
      isChallengeModeEnabled: false,
    };

    render(<Header setGlobalState={mock} globalState={state} />);

    const homeIcon = screen.getAllByRole("img")[1];
    const text = screen.getByText("Home");

    expect(homeIcon).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });

  it("renders third nav item", () => {
    const mock = () => jest.fn();
    const state = {
      isSuccessfullyLoaded: false,
      activateAboutUsPage: false,
      activateHomePage: true,
      showHints: false,
      isChallengeModeEnabled: false,
    };

    render(<Header setGlobalState={mock} globalState={state} />);

    const text = screen.getByText("About Us");

    expect(text).toBeInTheDocument();
  });

  it("renders Github link", () => {
    const mock = () => jest.fn();
    const state = {
      isSuccessfullyLoaded: false,
      activateAboutUsPage: false,
      activateHomePage: true,
      showHints: false,
      isChallengeModeEnabled: false,
    };

    render(<Header setGlobalState={mock} globalState={state} />);

    const link = screen.getByRole("button", { name: /github/i });
    const text = screen.getByText("Github");

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      "href",
      "https://github.com/SasanLabs/VulnerableApp-facade"
    );
    expect(text).toBeInTheDocument();
  });

  describe("dropdown", () => {
    it("renders dropdown", () => {
      const mock = () => jest.fn();
      const state = {
        isSuccessfullyLoaded: false,
        activateAboutUsPage: false,
        activateHomePage: true,
        showHints: false,
        isChallengeModeEnabled: false,
      };

      render(<Header setGlobalState={mock} globalState={state} />);

      const dropDownTitle = screen.getByText("Projects by SasanLabs");

      expect(dropDownTitle).toBeInTheDocument();
    });

    it("renders first item", () => {
      const mock = () => jest.fn();
      const state = {
        isSuccessfullyLoaded: false,
        activateAboutUsPage: false,
        activateHomePage: true,
        showHints: false,
        isChallengeModeEnabled: false,
      };

      render(<Header setGlobalState={mock} globalState={state} />);

      const owaspLink = screen.getByRole("link", {
        name: "Owasp VulnerableApp",
      });

      const text = screen.getByText("Owasp VulnerableApp");

      expect(owaspLink).toBeInTheDocument();
      expect(owaspLink).toHaveAttribute(
        "href",
        "https://github.com/SasanLabs/VulnerableApp"
      );
      expect(text).toBeInTheDocument();
    });

    it("renders second item", () => {
      const mock = () => jest.fn();
      const state = {
        isSuccessfullyLoaded: false,
        activateAboutUsPage: false,
        activateHomePage: true,
        showHints: false,
        isChallengeModeEnabled: false,
      };

      render(<Header setGlobalState={mock} globalState={state} />);

      const zapLink = screen.getByRole("link", { name: "LLMForge" });

      const text = screen.getByText("LLMForge");

      expect(zapLink).toBeInTheDocument();
      expect(zapLink).toHaveAttribute(
        "href",
        "https://github.com/SasanLabs/LLMForge"
      );
      expect(text).toBeInTheDocument();
    });

    it("renders third item", () => {
      const mock = () => jest.fn();
      const state = {
        isSuccessfullyLoaded: false,
        activateAboutUsPage: false,
        activateHomePage: true,
        showHints: false,
        isChallengeModeEnabled: false,
      };

      render(<Header setGlobalState={mock} globalState={state} />);

      const safeLink = screen.getByRole("link", {
        name: /security awareness for everyone/i,
      });

      const text = screen.getByText("Security Awareness for Everyone");

      expect(safeLink).toBeInTheDocument();
      expect(safeLink).toHaveAttribute(
        "href",
        "https://github.com/SasanLabs/SAFE"
      );
      expect(text).toBeInTheDocument();
    });
  });

  describe("scanner dropdown", () => {
    it("renders scanner dropdown", () => {
      const mock = () => jest.fn();
      const state = {
        isSuccessfullyLoaded: false,
        activateAboutUsPage: false,
        activateHomePage: true,
        showHints: false,
        isChallengeModeEnabled: false,
      };

      render(<Header setGlobalState={mock} globalState={state} />);

      const dropDownTitle = screen.getByText("Scanners");

      expect(dropDownTitle).toBeInTheDocument();
    });

    it("renders first item", () => {
      const mock = () => jest.fn();
      const state = {
        isSuccessfullyLoaded: false,
        activateAboutUsPage: false,
        activateHomePage: true,
        showHints: false,
        isChallengeModeEnabled: false,
      };

      render(<Header setGlobalState={mock} globalState={state} />);

      const text = screen.getByText("DAST");

      expect(text).toBeInTheDocument();
    });

    it("renders second item", () => {
      const mock = () => jest.fn();
      const state = {
        isSuccessfullyLoaded: false,
        activateAboutUsPage: false,
        activateHomePage: true,
        showHints: false,
        isChallengeModeEnabled: false,
      };

      render(<Header setGlobalState={mock} globalState={state} />);

      const text = screen.getByText("SAST");

      expect(text).toBeInTheDocument();
    });

    it("should have tooltip for DAST", () => {
      const mock = () => jest.fn();
      const state = {
        isSuccessfullyLoaded: false,
        activateAboutUsPage: false,
        activateHomePage: true,
        showHints: false,
        isChallengeModeEnabled: false,
      };

      const dast = "Dynamic Application Security Testing";

      render(<Header setGlobalState={mock} globalState={state} />);

      expect(screen.getByTitle(dast)).toBeInTheDocument();
    });

    it("should have tooltip for SAST", () => {
      const mock = () => jest.fn();
      const state = {
        isSuccessfullyLoaded: false,
        activateAboutUsPage: false,
        activateHomePage: true,
        showHints: false,
        isChallengeModeEnabled: false,
      };

      const sast = "Static Application Security Testing";

      render(<Header setGlobalState={mock} globalState={state} />);

      expect(screen.getByTitle(sast)).toBeInTheDocument();
    });
  });
});
