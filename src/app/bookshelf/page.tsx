"use client";
import { Navbar, type NavbarTabs } from "./(components)/navbar";
import { useState } from "react";
import { Bookshelf } from "./(pages)/bookshelf";
import { Library } from "./(pages)/library";

export default function BookshelfHomepage() {
  const [currentTab, setCurrentTab] = useState<NavbarTabs>("bookshelf");

  return (
    <>
      <Navbar currentTab={currentTab} onTabChange={setCurrentTab} />
      {currentTab == "bookshelf" && <Bookshelf />}
      {currentTab == "library" && <Library />}
    </>
  );
}
