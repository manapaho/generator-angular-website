<%= yeoman.choices.name %>
==========================
Basic styles that apply to all applications, areas and features.

Import Order
============
Every `application` has `app.whitelabel.less` files which import the `<%= yeoman.choices.name %>` `base.whitelabel.less` file.

The resulting import order will be:

* bootstrap.*.less
* base.bootstrap.*.less
* base.whitelabel.bootstrap.*.less

Bootstrap Overrides
===================
We are fully committed to bootstrap, to be able to exchange and reuse styles across applications and the whole organization.

To make it easier to track changes whenever we want to upgrade to a newer version of bootstrap, we follow this pattern:

* Copy and import the bootstrap file you want to override.
* Insert line comments // across the whole document.
* Uncomment only the lines that you want to override.

Now, when we want to upgrade bootstrap to a newer version, we only have to temporarily uncomment everything
and use WinMerge or any other merging tool to merge the changes into our overrides.

Benefits
========
* Easy to find and identify changes made to the bootstrap theme.
* Easy to upgrade all bootstrap overrides to newer versions of bootstrap.
* Easier to understand bootstrap and theming.
* Faster less compilation.
* Clean and simple hierarchies.

Application Hierarchy
=====================
The resulting import order including the application structure will be:

* bootstrap.*.less
* base.bootstrap.*.less
* base.whitelabel.bootstrap.*.less
* app.bootstrap.*.less
* feature(s).bootstrap.*.less
* app.whitelabel.bootstrap.*.less
* feature(s).whitelabel.bootstrap.*.less
