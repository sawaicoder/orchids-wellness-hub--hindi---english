"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useI18n } from "@/lib/i18n-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Filter, LogIn, Loader2, Search } from "lucide-react";
import { diseasesData } from "@/lib/diseases-data";

export default function AdminPage() {
  const { t } = useI18n();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterDisease, setFilterDisease] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsAuthenticated(true);
      fetchSubmissions();
    } else {
      alert("Invalid password");
    }
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
    } catch (error) {
      console.error("Error fetching submissions:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSubmissions = submissions.filter((s) => {
    const matchesDisease = filterDisease === "all" || s.existing_disease === filterDisease;
    const matchesSearch = s.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         s.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDisease && matchesSearch;
  });

  const exportToCSV = () => {
    const headers = ["ID", "Name", "Age", "Gender", "Email", "Disease", "Symptoms", "Lifestyle", "Date"];
    const rows = filteredSubmissions.map(s => [
      s.id, s.full_name, s.age, s.gender, s.email, s.existing_disease, s.symptoms, s.lifestyle, s.created_at
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `health_submissions_${new Date().toISOString()}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
              <p className="text-center text-xs text-zinc-500">
                Default password: <span className="font-mono">admin123</span>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-4">
          <Button onClick={fetchSubmissions} variant="outline" size="sm">
            Refresh
          </Button>
          <Button onClick={exportToCSV} size="sm" className="bg-emerald-600 hover:bg-emerald-700">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div>
          <Select onValueChange={setFilterDisease} defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Filter by disease" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Diseases</SelectItem>
              <SelectItem value="None">None</SelectItem>
              {diseasesData.map((d) => (
                <SelectItem key={d.id} value={d.id}>{d.nameEn}</SelectItem>
              ))}
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Age/Gender</TableHead>
                <TableHead>Disease</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Symptoms</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    <Loader2 className="mx-auto h-6 w-6 animate-spin text-emerald-600" />
                  </TableCell>
                </TableRow>
              ) : filteredSubmissions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-zinc-500">
                    No submissions found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredSubmissions.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="text-xs">
                      {new Date(s.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-medium">
                      {s.full_name}
                      <div className="text-xs text-zinc-500">{s.email}</div>
                    </TableCell>
                    <TableCell>
                      {s.age} / {s.gender}
                    </TableCell>
                    <TableCell>
                      <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                        {s.existing_disease}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm">{s.contact_number}</TableCell>
                    <TableCell className="max-w-xs truncate text-xs text-zinc-500">
                      {s.symptoms || "N/A"}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
