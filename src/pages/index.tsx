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
import TeamPage from "./team/TeamPage";
import AdminPage from "./admins/AdminPage";
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
                    {
                      path: "/team",
                      element: (
                        <Suspense>
                          <TeamPage />
                        </Suspense>
                      ),
                    },
                    {
                      path: "/admins",
                      element: (
                        <Suspense>
                          <AdminPage />
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
