"use client";
import { Navbar, type NavbarTabs } from "./(components)/navbar";
import { useState } from "react";
import { Bookshelf } from "./(pages)/bookshelf";
import { Library } from "./(pages)/library";
import { useDisclosure } from "@mantine/hooks";
import { BookModal } from "./(components)/book";

export default function BookshelfHomepage() {
  const [currentTab, setCurrentTab] = useState<NavbarTabs>("bookshelf");
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Navbar currentTab={currentTab} onTabChange={setCurrentTab} onAddBook={open} />
      <BookModal open={opened} onClose={close} />
      {currentTab == "bookshelf" && <Bookshelf />}
      {currentTab == "library" && <Library />}
    </>
  );
}
