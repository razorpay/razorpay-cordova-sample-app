<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx.png" width="600" alt="Nx - Smart, Extensible Build Framework"></p>

<div style="text-align: center;">

[![CircleCI](https://circleci.com/gh/nrwl/nx.svg?style=svg)](https://circleci.com/gh/nrwl/nx)
[![License](https://img.shields.io/npm/l/@nrwl/workspace.svg?style=flat-square)]()
[![NPM Version](https://badge.fury.io/js/%40nrwl%2Fworkspace.svg)](https://www.npmjs.com/@nrwl/workspace)
[![Semantic Release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)]()
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Join the chat at https://gitter.im/nrwl-nx/community](https://badges.gitter.im/nrwl-nx/community.svg)](https://gitter.im/nrwl-nx/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Join us @nrwl/community on slack](https://img.shields.io/badge/slack-%40nrwl%2Fcommunity-brightgreen)](https://join.slack.com/t/nrwlcommunity/shared_invite/enQtNzU5MTE4OTQwOTk0LTgxY2E0ZWYzMWE0YzA5ZDA2MWM1NDVhNmI2ZWMyYmZhNWJiODk3MjkxZjY3MzU5ZjRmM2NmNWU1OTgyZmE4Mzc)

</div>


<hr>

# Nx Devkit

## What is Nx?

🔎 **Smart, Extensible Build Framework**

Nx is a smart and extensible build framework to help you architect, test, and build at any scale — integrating seamlessly with modern technologies and frameworks while providing a distributed graph-based task execution, computation caching, smart rebuilds of affected projects, powerful code generators, editor support, GitHub apps, and more.

### Best-in-Class Support for Monorepos

<strong>Nx</strong> provides distributed graph-based task execution and computation caching.

<strong>Nx</strong> is smart. It analyzes your workspace and figures out what can be affected by every code change.
That's why Nx doesn't rebuild and retest everything on every commit--<strong>it only rebuilds what is necessary</strong>
.

<strong>Nx</strong> partitions commands into a graph of smaller tasks. Nx then runs those tasks in parallel,
and <strong>it can even distribute them across multiple machines without any configuration</strong>.

<strong>Nx also uses a distributed computation cache.</strong> If someone has already built or tested similar code, Nx
will use their results to speed up the command for everyone else.

### Holistic Dev Experience Powered by an Advanced CLI and Editor Plugins

<strong>Nx</strong> helps scale your development from one team building one application to many teams building multiple
frontend and backend applications all in the same workspace. <strong >When using Nx, developers have a holistic dev
experience powered by an advanced CLI</strong > (with editor plugins), capabilities for controlled code sharing and
consistent code generation.

### Rich Plugin Ecosystem

<strong>Nx</strong> is an open platform with plugins for many modern tools and frameworks. It has support for
TypeScript, React, Angular, Cypress, Jest, Prettier, Nest.js, Next.js, Storybook, Ionic among others. With Nx, you get a
consistent dev experience regardless of the tools used.


## Getting Started

### Creating an Nx Workspace

**Using `npx`**

```bash
npx create-nx-workspace
```

**Using `npm init`**

```bash
npm init nx-workspace
```

**Using `yarn create`**

```bash
yarn create nx-workspace
```

The `create-nx-workspace` command will ask you to select a preset, which will configure some plugins and create your applications to help you get started.

```
? What to create in the new workspace (Use arrow keys)
❯ empty             [an empty workspace with a layout that works best for building apps]
  npm               [an empty workspace set up to publish npm packages (similar to and compatible with yarn workspaces)]
  react             [a workspace with a single React application]
  angular           [a workspace with a single Angular application]
  next.js           [a workspace with a single Next.js application]
  gatsby            [a workspace with a single Gatsby application]
  nest              [a workspace with a single Nest application]
  express           [a workspace with a single Express application]
  web components    [a workspace with a single app built using web components]
  react-express     [a workspace with a full stack application (React + Express)]
  angular-nest      [a workspace with a full stack application (Angular + Nest)]
```

Select the preset that works best for you.


## Documentation & Resources

Even though Nx isn't technology specific, we provide 3 separate flavours of the documentation site to it make it easier for you to get up and running. For every link below, you will be able to select whether you want your examples to be written in React, Node or Angular.

- [Nx Documentation and Guides](https://nx.dev)
- [Intro into Nx](https://nx.dev/getting-started/intro)
- [Interactive Tutorial with Videos](https://nx.dev/tutorial/01-create-application)

### Quick Start Videos

- [Scale Your React Development with Nx](https://www.youtube.com/watch?v=sNz-4PUM0k8)
- [Scale your Node Development with Nx](https://www.youtube.com/watch?v=iIh5h_G52kI)
- [Modern Angular with Nx Dev Tools](https://www.youtube.com/watch?v=cXOkmOy-8dk)

### Courses

<table>
  <tr>
    <td><strong>Scale React Development with Nx</strong></td>
    <td><strong>Nx Workspaces</strong></td>
    <td><strong>Advanced Nx Workspaces</strong></td>
  </tr>
  <tr>
    <td>
      <a href="https://egghead.io/playlists/scale-react-development-with-nx-4038" target="_blank">
      <p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/EGH_ScalingReactNx.png" height="150px" alt="Nx - Scale React Development with Nx video course"></p>
      </a>
    </td>
    <td>
      <a href="https://www.youtube.com/watch?v=2mYLe9Kp9VM&list=PLakNactNC1dH38AfqmwabvOszDmKriGco" target="_blank">
        <p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-workspace-course.png" width="350" alt="Nx Workspaces video course"></p>
      </a>
    </td>
    <td>  
      <a href="https://nxplaybook.com/p/advanced-nx-workspaces" target="_blank">
      <p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/advanced-nx-workspace-course.png" width="350" alt="Nx Advanced Workspaces video course"></p>
      </a>
    </td>
  </tr>
</table>

### Videos, Blogs, Books, Examples

- [Nx Dev Tools for Monorepos, In-Depth Explainer (React)](https://www.youtube.com/watch?v=jCf92IyR-GE)

- [Nx Dev Tools for Monorepos, In-Depth Explainer (Angular)](https://youtu.be/h5FIGDn5YM0)

- [Youtube Channel with Nx-Related Videos](https://www.youtube.com/playlist?list=PLakNactNC1dHHWx4JIORwfnEajRv6FG5m)

- [Blog Posts About Nx](https://blog.nrwl.io/nx/home)

- [Angular Enterprise Monorepo Patterns Book (free)](https://go.nrwl.io/angular-enterprise-monorepo-patterns-new-book?utm_campaign=Book%3A%20Monorepo%20Patterns%2C%20Jan%202019&utm_source=Github&utm_medium=Banner%20Ad)

- [Nx Examples Repo](https://github.com/nrwl/nx-examples)

# Engage with the Core Team and the Community

- [Nx Office Hours Playlist on YouTube](https://www.youtube.com/playlist?list=PLakNactNC1dE8KLQ5zd3fQwu_yQHjTmR5). It's a regular YouTube stream where we talk all things Nx. Join the stream, ask questions, etc.
- [Follow Nx on Twitter](https://twitter.com/NxDevTools)

