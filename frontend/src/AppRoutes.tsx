import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import AuthCallbackPage from './pages/AuthCallbackPage';
import ProtectedRoute from './auth/ProtectedRoute';
import HomePageLayout from './layouts/HomePageLayout';
import { Suspense, lazy } from 'react';

const HomePage = lazy(() => import('@/pages/HomePage'))
const SearchPage = lazy(() => import('@/pages/SearchPage'))
const DetailPage = lazy(() => import('@/pages/DetailPage'))
const UserProfilePage = lazy(() => import('@/pages/UserProfilePage'))
const ManageRestaurantPage = lazy(() => import('@/pages/ManageRestaurantPage'))
const OrderStatusPage = lazy(() => import('@/pages/OrderStatusPage'))

const AppRoutes = () => {
	return (
		<Suspense fallback={<div className='text-3xl font-bold min-h-screen flex items-center justify-center'>Loading...</div>}>
			<Routes>
				<Route
					path="/"
					element={
						<HomePageLayout>
							<HomePage />
						</HomePageLayout>
					}
				/>
				<Route path="/auth-callback" element={<AuthCallbackPage />} />
				<Route 
					path='/search/:city'
					element={
						<Layout showHero={false}>
							<SearchPage />
						</Layout>
					}
				/>
				<Route 
					path='/detail/:restaurantId'
					element={
						<Layout showHero={false}>
							<DetailPage />
						</Layout>
					}
				/>

				<Route element={<ProtectedRoute />}>
					<Route
						path="/user-profile"
						element={
							<Layout>
								<UserProfilePage />
							</Layout>
						}
					/>
					<Route
						path="/manage-restaurant"
						element={
							<Layout>
								<ManageRestaurantPage />
							</Layout>
						}
					/>
					<Route
						path="/order-status"
						element={
							<Layout>
								<OrderStatusPage />
							</Layout>
						}
					/>
				</Route>
				<Route path="*" element={<Navigate to={'/'} />} />
			</Routes>
		</Suspense>
	);
};

export default AppRoutes;
