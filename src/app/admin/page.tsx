"use client";

import { supabase } from "@/lib/supabase";
import { diseasesData } from "@/lib/diseases-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Download, Filter, Search, Lock, Users, LogOut, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [diseases, setDiseases] = useState<any[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterDisease, setFilterDisease] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") { 
      setIsAuthenticated(true);
      fetchSubmissions();
      fetchDiseases();
    } else {
      toast.error("Invalid password");
    }
  };

  const fetchDiseases = async () => {
    const { data } = await supabase.from("diseases").select("id, name_en, name_hi");
    if (data) setDiseases(data);
  };

  const fetchSubmissions = async () => {

      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("health_submissions")
          .select("*")
          .order("created_at", { ascending: false });


      if (error) throw error;
      setSubmissions(data || []);
      setFilteredSubmissions(data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch submissions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let result = submissions;
    if (filterDisease !== "all") {
      result = result.filter(s => s.existing_disease === filterDisease);
    }
    if (searchTerm) {
      result = result.filter(s => 
        s.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredSubmissions(result);
  }, [filterDisease, searchTerm, submissions]);

  const exportCSV = () => {
    if (filteredSubmissions.length === 0) return;
    
    const headers = ["Date", "Name", "Age", "Gender", "Email", "Disease", "Symptoms", "Lifestyle"];
    const rows = filteredSubmissions.map(s => [
      format(new Date(s.created_at), "yyyy-MM-dd"),
      s.full_name,
      s.age,
      s.gender,
      s.email,
      s.existing_disease,
      s.symptoms.replace(/,/g, ";"),
      s.lifestyle
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `health_submissions_${format(new Date(), "yyyy-MM-dd")}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100">
              <Lock className="h-6 w-6 text-zinc-600" />
            </div>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Enter admin password (admin123)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12"
                />
              </div>
              <Button type="submit" className="w-full h-12 bg-zinc-900 hover:bg-zinc-800">
                Login to Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Admin Dashboard</h1>
          <p className="text-zinc-600">Manage and analyze user health assessments.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
          <Button onClick={exportCSV} className="bg-emerald-600 hover:bg-emerald-700">
            <Download className="mr-2 h-4 w-4" /> Export CSV
          </Button>
        </div>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{submissions.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <Input
            placeholder="Search by name or email..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-zinc-400" />
          <Select onValueChange={setFilterDisease} defaultValue="all">
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by disease" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Diseases</SelectItem>
              {diseasesData.map(d => (
                <SelectItem key={d.id} value={d.id}>{d.name_en}</SelectItem>
              ))}
              <SelectItem value="none">No Disease</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="ghost" size="icon" onClick={fetchSubmissions} disabled={loading}>
          <Loader2 className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        </Button>
      </div>

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-zinc-50">
              <TableHead>Date</TableHead>
              <TableHead>User Details</TableHead>
              <TableHead>Disease</TableHead>
              <TableHead>Symptoms</TableHead>
              <TableHead>Lifestyle</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubmissions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-zinc-500">
                  {loading ? "Loading data..." : "No submissions found."}
                </TableCell>
              </TableRow>
            ) : (
              filteredSubmissions.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium whitespace-nowrap">
                    {format(new Date(s.created_at), "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-bold">{s.full_name}</span>
                      <span className="text-xs text-zinc-500">{s.email}</span>
                      <span className="text-xs text-zinc-400">{s.age}y, {s.gender}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                      {diseasesData.find(d => d.id === s.existing_disease)?.name_en || s.existing_disease || "None"}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-xs truncate text-zinc-600">
                    {s.symptoms}
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      s.lifestyle === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-zinc-100 text-zinc-700"
                    }`}>
                      {s.lifestyle}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
