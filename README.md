# CREATE PROJECT

pnpx create-next-app@latest

## PREREQUISITES

- TypeScript
- ESlint
- Tailwind
- ReactIcons (pnpm i react-icosn@4.11.0)

## GETTING STARTED

First, run the development server:

```
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. Clear all the boilerplate code in the main

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### STEPS

1.  Create navbar with logo, dashboard links using Next.js <Link /> element. Place navbar besides layout and integrate navbar in main layout page. Add Tailwind classes to style navbar accordingly:

    - flex
    - items-center to align items to the center
    - some padding on the x-axis
    - border-b to sapare it
    - height-14
    - define text-color and set additional for :hover effect. Smooth the effect with transition-color class

    Make links array and list all the available links with properties there. Popilate <Link></Link> element dynamicaly in order to avoid repeatable code.

    - We would like to show active link for the current path. For this purpose we will use usePathName next hook. The navbar will become client component. We initialize hook and
      make dynamic styling.

           - It is very import to set conditional rendering appropirately, otherwise it wont work

           className={`${

      link.href === currentPath ? 'text-slate-400' : 'text-slate-100'
      } hover:text-slate-200 transition-colors`}

    Missing space between conditional and hover state will brake the code.

    We can nicely solve this with the class name package.

    - pnpm i classnames

    We import classnames function from classnames. Than we can set class names accordingly as an object attributes:

    className={classnames({
    'text-slate-400': link.href === currentPath,
    'text-slate-100': link.href !== currentPath,
    'hover:text-slate-200 transition-colors': true,
    })

2.  Insert {children} into the main tag of the layout page to make it more semantically appropirate.

### DATABASE

In order to keep things clean it is best to create isolated service for the database server. This example utilises mysql server.

1. Create docker-compose file

2. Define service for the mysql server

- Set image name
- Define ports
- Set server credentials and store the in file holding environmental variables
- Run docker-compose up -d

DATABASE URL has the following structure:

DATABASE_URL = "protocol://rootuser:password@host:port/databasename"

### DATA

1. For this project we use Prisma ORM

Installation: pnpx i prisma

- We need to define Prisma model in schema.prisma file.
- We format with:

  pnpx prisma format

- We need to execute creation of the model in the running database

  pnpx prisma migrate dev

  Prisma creates a migrations folder in which you have file holding all the neccessary data about your migration

  migration.sql

  If you already have a database, you don't need to execute all the previous steps. You can simply run:

  pnpx prisma db pull

- You can check if teh database on the server was created succesfully with various tools. This project is using DBeaver.

2. Data validation

For the data validation we use Zod.

Installation:

pnpm i zod@3.22.2
