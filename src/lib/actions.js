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
  if (!supabaseAdmin) return [];
  const { data, error } = await supabaseAdmin
    .from('notices')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return [];
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
  if (!supabaseAdmin) return [];
  const { data, error } = await supabaseAdmin
    .from('teachers')
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: true });
  if (error) return [];
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
  if (!supabaseAdmin) return [];
  const { data, error } = await supabaseAdmin
    .from('classes')
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: true });
  
  if (error) return [];
  
  // Auto-seed if empty
  if (data && data.length === 0) {
    const defaultClasses = [
      { name: 'Pre-Nursery', name_bn: 'প্রি-নার্সারি', display_order: 1 },
      { name: 'Nursery', name_bn: 'নার্সারি', display_order: 2 },
      { name: 'Class 1', name_bn: 'প্রথম শ্রেণী', display_order: 3 },
      { name: 'Class 2', name_bn: 'দ্বিতীয় শ্রেণী', display_order: 4 },
      { name: 'Class 3', name_bn: 'তৃতীয় শ্রেণী', display_order: 5 },
      { name: 'Class 4', name_bn: 'চতুর্থ শ্রেণী', display_order: 6 }
    ];
    await supabaseAdmin.from('classes').insert(defaultClasses);
    
    const { data: newData } = await supabaseAdmin
      .from('classes')
      .select('*')
      .order('display_order', { ascending: true });
    return newData || [];
  }
  
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

export async function updateClass(id, classData) {
  await checkAuth();
  const { error } = await supabaseAdmin
    .from('classes')
    .update(classData)
    .eq('id', id);
  if (error) throw error;
  revalidatePath('/');
  revalidatePath('/admin/classes');
}

// ==========================================
// GALLERY
// ==========================================
export async function getGallery() {
  if (!supabaseAdmin) return [];
  const { data, error } = await supabaseAdmin
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return [];
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
  if (!supabaseAdmin) return [];
  const { data, error } = await supabaseAdmin
    .from('alumni')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return [];
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
  if (!supabaseAdmin) return null;
  const { data, error } = await supabaseAdmin
    .from('stats')
    .select('*')
    .eq('id', 1)
    .single();
  if (error) return null;
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
  if (!supabaseAdmin) return [];
  const { data, error } = await supabaseAdmin
    .from('fees')
    .select('*')
    .order('display_order', { ascending: true });
  if (error) return [];
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
  await checkAuth();
  const { error } = await supabaseAdmin.from('fees').delete().eq('id', id);
  if (error) throw error;
  revalidatePath('/');
  revalidatePath('/admin/fees');
}
