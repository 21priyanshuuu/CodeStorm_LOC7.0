import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components"
import Link from "next/link"
import { ArrowRight, BarChart3, FileText, Lock, Shield, Users } from "lucide-react"
import Image from "next/image"

export default async function Home() {
  const { isAuthenticated } = getKindeServerSession()

  if (!(await isAuthenticated())) {
    return redirect("/api/auth/login?post_login_redirect_url=https://sampank.vercel.app//page/home")
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">PoliceConnect</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/page/home"
              className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Go to Home
            </Link>
            <LogoutLink className="inline-flex h-10 items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
              Log out
            </LogoutLink>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Digital Transformation for Modern Policing
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Empowering law enforcement with cutting-edge technology to enhance public safety, streamline
                    operations, and build community trust.
                  </p>
                </div>
                <div>
                  <Link
                    href="/page/home"
                    className="inline-flex h-12 items-center justify-center rounded-md bg-blue-600 px-8 py-3 text-base font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
              <Image
                src="/img.jpeg?height=550&width=550"
                width={550}
                height={550}
                alt="Police digital transformation"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Transforming Law Enforcement</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our digital transformation initiative brings modern technology solutions to enhance every aspect of
                  policing.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {/* Custom Card 1 */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex flex-row items-center gap-4 mb-4">
                  <Lock className="h-8 w-8 text-blue-600" />
                  <h3 className="text-lg font-bold">Enhanced Security</h3>
                </div>
                <p className="text-sm text-gray-500">
                  State-of-the-art encryption and security protocols to protect sensitive data and communications.
                </p>
              </div>

              {/* Custom Card 2 */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex flex-row items-center gap-4 mb-4">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <h3 className="text-lg font-bold">Digital Reporting</h3>
                </div>
                <p className="text-sm text-gray-500">
                  Streamlined digital reporting systems that reduce paperwork and increase efficiency in the field.
                </p>
              </div>

              {/* Custom Card 3 */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex flex-row items-center gap-4 mb-4">
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                  <h3 className="text-lg font-bold">Data Analytics</h3>
                </div>
                <p className="text-sm text-gray-500">
                  Advanced analytics tools to identify patterns, predict crime hotspots, and allocate resources
                  effectively.
                </p>
              </div>

              {/* Custom Card 4 */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex flex-row items-center gap-4 mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                  <h3 className="text-lg font-bold">Community Engagement</h3>
                </div>
                <p className="text-sm text-gray-500">
                  Digital platforms for improved communication and collaboration with the communities we serve.
                </p>
              </div>

              {/* Custom Card 5 */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex flex-row items-center gap-4 mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                  <h3 className="text-lg font-bold">Officer Safety</h3>
                </div>
                <p className="text-sm text-gray-500">
                  Real-time information and communication tools to enhance officer safety in the field.
                </p>
              </div>

              {/* Custom Card 6 */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex flex-row items-center gap-4 mb-4">
                  <ArrowRight className="h-8 w-8 text-blue-600" />
                  <h3 className="text-lg font-bold">Rapid Response</h3>
                </div>
                <p className="text-sm text-gray-500">
                  Optimized dispatch and response systems to reduce response times and improve emergency services.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-10 px-10 md:gap-16 lg:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Measurable Results</h2>
                <p className="text-gray-500 md:text-xl">
                  Our digital transformation initiative has already shown significant improvements in key performance
                  metrics.
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {/* Custom Stat Card 1 */}
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="text-4xl font-bold text-blue-600">42%</h3>
                  <p className="text-sm text-gray-500">Reduction in paperwork</p>
                </div>

                {/* Custom Stat Card 2 */}
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="text-4xl font-bold text-blue-600">28%</h3>
                  <p className="text-sm text-gray-500">Faster response times</p>
                </div>

                {/* Custom Stat Card 3 */}
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="text-4xl font-bold text-blue-600">63%</h3>
                  <p className="text-sm text-gray-500">Improved data accuracy</p>
                </div>

                {/* Custom Stat Card 4 */}
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="text-4xl font-bold text-blue-600">3.2x</h3>
                  <p className="text-sm text-gray-500">Increase in case clearance</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container mx-auto grid items-center gap-6 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Ready to transform your department?
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed">
                Join hundreds of police departments nationwide that have already enhanced their operations through our
                digital transformation platform.
              </p>
            </div>
            <div className="mx-auto">
              <Link
                href="/page/home"
                className="inline-flex h-12 items-center justify-center rounded-md bg-blue-600 px-8 py-3 text-base font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Go to Home Page
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 py-6 md:py-0">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-6">
          <p className="text-center text-sm leading-loose text-gray-500 md:text-left">
            © 2025 PoliceConnect. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900">
              Terms
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900">
              Privacy
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

