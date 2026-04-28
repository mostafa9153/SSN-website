'use server';

import { supabaseAdmin } from './supabase/server';
import { supabase } from './supabase/client';
import { isAuthenticated } from './auth';
import { revalidatePath } from 'next/cache';

// Helper to check auth for mutations
async function checkAuth() {
  if (!(await isAuthenticated())) {
    throw new Error('Unauthorized');
  }
}

// ==========================================
// NOTICES
// ==========================================
export async function getNotices() {
  const { data, error } = await supabase
    .from('notices')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function addNotice(noticeData) {
  await checkAuth();
  const { error } = await supabaseAdmin.from('notices').insert([noticeData]);
  if (error) throw error;
  revalidatePath('/');
  revalidatePath('/admin/notices');
}

export async function deleteNotice(id) {
  await checkAuth();
  const { error } = await supabaseAdmin.from('notices').delete().eq('id', id);
  if (error) throw error;
  revalidatePath('/');
  revalidatePath('/admin/notices');
}

// ==========================================
// TEACHERS
// ==========================================
export async function getTeachers() {
  const { data, error } = await supabase
    .from('teachers')
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data;
}

export async function addTeacher(teacherData) {
  await checkAuth();
  const { error } = await supabaseAdmin.from('teachers').insert([teacherData]);
  if (error) throw error;
  revalidatePath('/');
  revalidatePath('/admin/teachers');
}

export async function deleteTeacher(id) {
  await checkAuth();
  const { error } = await supabaseAdmin.from('teachers').delete().eq('id', id);
  if (error) throw error;
  revalidatePath('/');
  revalidatePath('/admin/teachers');
}

// ==========================================
// CLASSES
// ==========================================
export async function getClasses() {
  const { data, error } = await supabase
    .from('classes')
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data;
}

export async function addClass(classData) {
  await checkAuth();
  const { error } = await supabaseAdmin.from('classes').insert([classData]);
  if (error) throw error;
  revalidatePath('/');
  revalidatePath('/admin/classes');
}

export async function deleteClass(id) {
  await checkAuth();
  const { error } = await supabaseAdmin.from('classes').delete().eq('id', id);
  if (error) throw error;
  revalidatePath('/');
  revalidatePath('/admin/classes');
}

// ==========================================
// GALLERY
// ==========================================
export async function getGallery() {
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function addGalleryItem(itemData) {
  await checkAuth();
  const { error } = await supabaseAdmin.from('gallery').insert([itemData]);
  if (error) throw error;
  revalidatePath('/');
  revalidatePath('/admin/gallery');
}

export async function deleteGalleryItem(id) {
  await checkAuth();
  const { error } = await supabaseAdmin.from('gallery').delete().eq('id', id);
  if (error) throw error;
  revalidatePath('/');
  revalidatePath('/admin/gallery');
}

// ==========================================
// ALUMNI
// ==========================================
export async function getAlumni() {
  const { data, error } = await supabase
    .from('alumni')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function addAlumni(alumniData) {
  await checkAuth();
  const { error } = await supabaseAdmin.from('alumni').insert([alumniData]);
  if (error) throw error;
  revalidatePath('/');
  revalidatePath('/admin/alumni');
}

export async function deleteAlumni(id) {
  await checkAuth();
  const { error } = await supabaseAdmin.from('alumni').delete().eq('id', id);
  if (error) throw error;
  revalidatePath('/');
  revalidatePath('/admin/alumni');
}

// ==========================================
// STATS
// ==========================================
export async function getStats() {
  const { data, error } = await supabase
    .from('stats')
    .select('*')
    .eq('id', 1)
    .single();
  if (error && error.code !== 'PGRST116') throw error; // ignore no rows error
  return data;
}

export async function updateStats(statsData) {
  await checkAuth();
  const { error } = await supabaseAdmin
    .from('stats')
    .update(statsData)
    .eq('id', 1);
  if (error) throw error;
  revalidatePath('/');
  revalidatePath('/admin/stats');
}

// ==========================================
// FEES
// ==========================================
export async function getFees() {
  const { data, error } = await supabase
    .from('fees')
    .select('*')
    .order('display_order', { ascending: true });
  if (error) throw error;
  return data;
}

export async function addFee(feeData) {
  await checkAuth();
  const { error } = await supabaseAdmin.from('fees').insert([feeData]);
  if (error) throw error;
  revalidatePath('/');
  revalidatePath('/admin/fees');
}

export async function deleteFee(id) {
  checkAuth();
  const { error } = await supabaseAdmin.from('fees').delete().eq('id', id);
  if (error) throw error;
  revalidatePath('/');
  revalidatePath('/admin/fees');
}
