import { approveDelevari } from "@/lib/apis/delevary";
import { userSession } from "@/lib/core/session";

const LibrarianDashboardPage = async () => {
    const user = await userSession()
   const paymentData = await approveDelevari() 
    return (
        <div>
            <h1>dashboasrd</h1>
        </div>
    );
};

export default LibrarianDashboardPage;