import { ReactNode } from 'react'
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

import { Header, HeaderProps } from '@/components/header'
import { useMeQuery, useSignOutMutation } from '@/services/auth/auth.service'

import 'react-toastify/dist/ReactToastify.css'

import s from './layout.module.scss'
type AuthContext = {
  isAuthenticated: boolean
}

export function useAuthContext() {
  return useOutletContext<AuthContext>()
}
export const Layout = () => {
  const { data, isError, isLoading } = useMeQuery()
  const isAuthenticated = !isError && !isLoading

  const [signOut] = useSignOutMutation()
  const navigate = useNavigate()
  const handleSignOut = async () => {
    try {
      await signOut().unwrap()
      toast.success('Log-out successfully')
      navigate('/sign-in')
    } catch (error: any) {
      toast.error(error.data.message ?? 'Could not Log Out')
    }
  }

  return (
    <LayoutPrimitive
      avatar={data?.avatar ?? null}
      email={data?.email ?? ''}
      isAuthenticated={isAuthenticated}
      onLogout={handleSignOut}
      userName={data?.name ?? ''}
    >
      <Outlet context={{ isAuthenticated } satisfies AuthContext} />
      <ToastContainer
        autoClose={5000}
        closeOnClick
        draggable
        hideProgressBar={false}
        newestOnTop={false}
        pauseOnFocusLoss
        pauseOnHover
        position={'bottom-right'}
        rtl={false}
        theme={'dark'}
      />
    </LayoutPrimitive>
  )
}

export type LayoutProps = { children: ReactNode } & HeaderProps
export const LayoutPrimitive = ({ children, ...rest }: LayoutProps) => {
  return (
    <div className={s.layout}>
      <Header {...rest} />
      <main className={s.main}>{children}</main>
    </div>
  )
}
