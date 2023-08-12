import { Suspense } from "react";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import {
  CoinsIcon,
  DollarSignIcon,
  FactoryIcon,
  LandmarkIcon,
  UserIcon,
  Users2Icon,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Container from "./components/ui/Container";

import { getUsers } from "@/actions/get-users";
import { getEmployees } from "@/actions/get-empoloyees";
import { getAccounts } from "@/actions/crm/get-accounts";
import { getLeads } from "@/actions/crm/get-leads";
import { getOpportunities } from "@/actions/crm/get-opportunities";
import { getTasks } from "@/actions/projects/get-tasks";
import { getUserTasks } from "@/actions/projects/get-user-tasks";
import { getBoards } from "@/actions/projects/get-boards";
import { getInvoices } from "@/actions/invoice/get-invoices";
import { getDocuments } from "@/actions/documents/get-documents";
import { getStorageSize } from "@/actions/documents/get-storage-size";
import NotionsBox from "./components/dasboard/notions";
import LoadingBox from "./components/dasboard/loading-box";
import Link from "next/link";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  const userId = session?.user?.id;
  const users = await getUsers();
  const employees = await getEmployees();
  const accounts = await getAccounts();
  const leads = await getLeads();
  const opportunities = await getOpportunities();
  const tasks = await getTasks();
  const usersTasks = await getUserTasks(userId);
  const projects = await getBoards(userId);
  const invoices = await getInvoices();
  const documents = await getDocuments();
  const storage = await getStorageSize();

  return (
    <Container
      title="Dashboard"
      description={
        "Welcome to NextCRM cockpit, here you can see your company overview"
      }
    >
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSignIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium">{"0"}</div>
          </CardContent>
        </Card>
        <Link href="/admin/users">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active users
              </CardTitle>
              <UserIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-medium">{users.length}</div>
            </CardContent>
          </Card>
        </Link>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Employees</CardTitle>
            <Users2Icon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium">{employees.length}</div>
          </CardContent>
        </Card>
        <Link href="/crm/accounts">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Accounts</CardTitle>
              <LandmarkIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-medium">{accounts.length}</div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/crm/opportunities">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Opportunities
              </CardTitle>
              <FactoryIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-medium">{opportunities.length}</div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/crm/leads">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Leads</CardTitle>
              <CoinsIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-medium">{leads.length}</div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/projects">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Projects</CardTitle>
              <CoinsIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-medium">{projects?.length}</div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/projects/tasks">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasks</CardTitle>
              <CoinsIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-medium">
                {tasks?.length ? tasks.length : 0}
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href={`/projects/tasks/${userId}`}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">My Tasks</CardTitle>
              <CoinsIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-medium">{usersTasks.length}</div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/invoice">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Invoices</CardTitle>
              <CoinsIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-medium">{invoices.length}</div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/documents">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Documents</CardTitle>
              <CoinsIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-medium">{documents.length}</div>
            </CardContent>
          </Card>
        </Link>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage</CardTitle>
            <CoinsIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium">{storage}/MB</div>
          </CardContent>
        </Card>
        <Suspense fallback={<LoadingBox />}>
          <NotionsBox />
        </Suspense>
      </div>
    </Container>
  );
};

export default DashboardPage;
