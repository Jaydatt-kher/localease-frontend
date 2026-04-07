import Navbar from '../../components/layout/Navbar'
import HeroSection from '../../components/home/HeroSection'
import CategoriesSection from '../../components/home/CategoriesSection'
import NearbyProviders from '../../components/home/NearbyProviders'
import { HowItWorksSection } from '../../components/home/HowItWorksSection'
import RecentBookings from '../../components/home/RecentBookings'
import BecomeProviderBanner from '../../components/home/BecomeProviderBanner'
import Footer from '../../components/layout/Footer'


const HomePage = () => {
    return (
        <div className='min-h-screen flex flex-col bg-background-light dark:bg-background-dark'>
            <Navbar />
            <main className='flex-1'>
                <HeroSection />
                <RecentBookings />
                <CategoriesSection />
                <NearbyProviders />
                <HowItWorksSection />
                <BecomeProviderBanner/>
            </main>
            <Footer/>
        </div>
    )
}

export default HomePage
