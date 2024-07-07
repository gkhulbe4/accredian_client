"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const resources = [
  "Key Modules",
  "Fact Sheet",
  "E Book",
  "Blog",
  "Success Stories",
  "Glosary",
];

const aboutUs = [
  "For Corporate",
  "Why Accredian",
  "Career",
  "Vision & Mission",
];

export function NavItems() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Refer & Earn</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] ">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <div>
                    <p className="text-sm font-light w-full">
                      Refer your friends to Accredian and earn exciting rewards!
                      Each successful referral grants you discounts on our
                      courses. Your friends will also enjoy exclusive benefits
                      upon joining. There is no limit to how much you can
                      earn—refer more, earn more. Join the Accredian community
                      and start referring today!
                    </p>
                  </div>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <div className="flex flex-col w-full ">
                    {resources.map((r) => (
                      <div
                        key={r}
                        className="px-3 py-2 w-full hover:bg-[#eff5ff] hover:text-[#1c6fe1] rounded-md"
                      >
                        <p className="text-sm font-light w-full">{r}</p>
                      </div>
                    ))}
                  </div>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>About Us</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <div className="flex flex-col w-full">
                    {aboutUs.map((r) => (
                      <div
                        key={r}
                        className="px-3 py-2 w-full hover:bg-[#eff5ff] hover:text-[#1c6fe1] rounded-md"
                      >
                        <p className="text-sm font-light w-full">{r}</p>
                      </div>
                    ))}
                  </div>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
