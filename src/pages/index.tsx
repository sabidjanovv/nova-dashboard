import React from "react";
import { Suspense } from "../utils";
import { useRoutes } from "react-router-dom";
import Auth from "./auth/Auth";
import Login from "./login/Login";
import Layout from "./layout/Layout";
import CustomAuth from "./custom-auth/CustomAuth";
import Profile from "./profile/Profile";
import CategoriesPage from "./categories/Categories";
import CollectionsPage from "./collections/Collections";
import CollectionDetail from "./collections/CollectionDetail";
const AppRouter = () => {
  return (
    <>
      {useRoutes([
        {
          path: "/",
          element: (
            <Suspense>
              <Auth />
            </Suspense>
          ),
          children: [
            {
              path: "/",
              element: (
                <Suspense>
                  <Layout />
                </Suspense>
              ),
              children: [
                {
                  path: "/",
                  element: (
                    <Suspense>
                      <CustomAuth to="/branches" />
                    </Suspense>
                  ),
                  children: [
                    {
                      path: "/categories",
                      element: (
                        <Suspense>
                          <CategoriesPage />
                        </Suspense>
                      ),
                    },
                    {
                      path: "/collections",
                      element: (
                        <Suspense>
                          <CollectionsPage />
                        </Suspense>
                      ),
                    },
                    {
                      path: "/collections/:id",
                      element: (
                        <Suspense>
                          <CollectionDetail />
                        </Suspense>
                      ),
                    },
                    {
                      path: "/profile",
                      element: (
                        <Suspense>
                          <Profile />
                        </Suspense>
                      ),
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          path: "/login",
          element: (
            <Suspense>
              <Login />
            </Suspense>
          ),
        },
      ])}
    </>
  );
};
export default React.memo(AppRouter);
